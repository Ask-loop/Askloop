import { UsersService } from '@modules/users/users.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { OauthProfile } from './interfaces/oauth.interface';
import { MailService } from '@modules/mail/mail.service';
import { AuthenticationMethod } from '@shared/enums';
import { AccountsService } from '@modules/accounts/accounts.service';
import { TokensService } from '@modules/tokens/tokens.service';
import { comparePasswords, hashPassword } from '@shared/utils/password';
import { successResponse } from '@shared/utils/response';
import { User } from '@modules/users/entities';
import { SignInResponse } from './types/sign-in.types';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly accountsService: AccountsService,
    private readonly configService: ConfigService,
  ) {}

  // --- CORE AUTH METHODS --- //

  async signIn(dto: AuthDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const account = await this.accountsService.findByProvider(AuthenticationMethod.EMAIL, user.id.toString());

    if (!account) {
      const oauthAccount = await this.accountsService.findByProvider(user.provider, user.providerId);

      if (oauthAccount) {
        throw new ConflictException(`This account uses ${user.provider} login. Please continue with ${user.provider}.`);
      } else {
        throw new BadRequestException('Please check your email and password');
      }
    }

    const isPasswordValid = await comparePasswords(dto.password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Please check your email and password');

    if (!user.emailVerified) {
      const verificationToken = await this.tokensService.storeEmailVerificationToken(user.email);

      await this.mailService.sendUnverifiedReminderEmail(user.email, verificationToken);

      throw new BadRequestException('Please check your email for a verification link');
    }

    const tokens = await this.tokensService.generateTokens(user.id);

    return {
      ...tokens,
      user: this.normalizeUser(user),
    };
  }

  async signUp({ email, password }: AuthDto) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = await this.tokensService.storeEmailVerificationToken(email);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      provider: AuthenticationMethod.EMAIL,
    });

    await this.accountsService.createEmailUser(user);

    const tokens = await this.tokensService.generateTokens(user.id);

    await this.sendVerificationEmail(email, verificationToken);

    return {
      ...tokens,
      user: this.normalizeUser(user),
    };
  }

  async verifyEmail(verificationToken: string) {
    const email = await this.tokensService.verifyEmailVerificationToken(verificationToken);

    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('Invalid verification token');

    if (user.emailVerified) throw new BadRequestException('Email already verified');

    await this.usersService.update(user.id, { emailVerified: true });
  }

  async signOut(userId: number) {
    await this.tokensService.revokeAllRefreshTokens(userId);
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.emailVerified) throw new UnauthorizedException('Please verify your email before requesting a password reset');

    const account = await this.accountsService.findByProvider(AuthenticationMethod.EMAIL, user.id.toString());

    if (!account) {
      throw new BadRequestException(`This account does not use email/password login. Please sign in with ${user.provider} or create an account with email/password.`);
    }

    await this.sendPasswordResetEmail(email);
  }

  async resetPassword(token: string, newPassword: string) {
    const email = await this.tokensService.verifyPasswordResetToken(token);

    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await hashPassword(newPassword);

    await this.usersService.update(user.id, { password: hashedPassword });
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.usersService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await comparePasswords(oldPassword, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const hashedPassword = await hashPassword(newPassword);

    await this.usersService.update(userId, { password: hashedPassword });
  }

  async refreshTokens(refreshToken: string) {
    const { userId, rotationId } = await this.tokensService.decodeRefreshToken(refreshToken);

    await this.tokensService.verifyRefreshToken(refreshToken, userId, rotationId);

    const user = await this.usersService.findById(userId);

    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.tokensService.generateTokens(userId);

    return {
      ...tokens,
      user: this.normalizeUser(user),
    };
  }

  async deleteAccount(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    await this.tokensService.revokeAllRefreshTokens(userId);

    await this.usersService.delete(userId);
  }

  // --- OAUTH METHODS --- //

  async oauthSignIn(profile: OauthProfile) {
    const existingAccount = await this.accountsService.findByProvider(profile.provider, profile?.providerId);

    if (existingAccount) {
      const user = await this.usersService.findById(existingAccount?.user?.id);

      if (!user) throw new UnauthorizedException('User not found');

      if (!user.emailVerified) throw new UnauthorizedException('Please verify your email before logging in');

      const tokens = await this.tokensService.generateTokens(user.id);

      return successResponse(
        {
          ...tokens,
          user: this.normalizeUser(user),
        },
        'Sign in successful',
      );
    }

    const existingUser = await this.usersService.findByEmail(profile.email);
    if (existingUser) {
      const account = await this.accountsService.findByProvider(profile.provider, existingUser.id.toString());

      if (account) throw new ConflictException('Account already connected');

      await this.accountsService.createOAuthUser(profile.provider, profile.providerId, existingUser);

      const tokens = await this.tokensService.generateTokens(existingUser.id);

      return successResponse(
        {
          ...tokens,
          user: existingUser,
        },
        'Sign in successful',
      );
    }

    const user = await this.usersService.createOauthUser(profile);

    const tokens = await this.tokensService.generateTokens(user.id);

    return successResponse(
      {
        ...tokens,
        user,
      },
      'Sign in successful',
    );
  }

  async callbackOauth(req: Request & { user: { data: SignInResponse } }, res: Response) {
    const { accessToken, refreshToken, user } = req?.user?.data;

    const redirectUrl = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');

    const encodedUser = encodeURIComponent(JSON.stringify(user));

    return res.redirect(`${redirectUrl}/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${encodedUser}`);
  }

  // --- EMAIL METHODS --- //

  private async sendVerificationEmail(email: string, verificationToken: string) {
    await this.mailService.sendConfirmationEmail(email, verificationToken);

    return successResponse(null, 'Email verification sent. Please check your email.');
  }

  async sendPasswordResetEmail(email: string) {
    const passwordResetToken = await this.tokensService.storePasswordResetToken(email);

    await this.mailService.sendPasswordResetEmail(email, passwordResetToken);

    return successResponse(null, 'Password reset email sent');
  }

  private normalizeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
