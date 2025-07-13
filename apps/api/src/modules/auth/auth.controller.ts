import { Body, Controller, Delete, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthDto, VerifyEmailDto, RefreshTokenDto, RequestPasswordResetDto, ResetPasswordDto, ChangePasswordDto, SignUpDto } from './dto/auth.dto';
import { GoogleOAuthGuard } from './guards/google.guard';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { GithubOAuthGuard } from './guards/github.guard';
import { SignInResponse } from './types/sign-in.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Message } from '@common/decorators/message.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Post('sign-up')
  @HttpCode(200)
  @Message('Email verification sent. Please check your email.')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('verify-email')
  @Message('Email verified successfully')
  @HttpCode(200)
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.verificationToken);
  }

  @Post('sign-out')
  @UseGuards(AuthGuard)
  async signOut(@Req() req: Request) {
    return this.authService.signOut(req?.user?.id);
  }

  @Post('refresh-tokens')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Post('request-password-reset')
  @Throttle({ default: { limit: 3, ttl: 300 } })
  @HttpCode(200)
  @Message('Password reset email sent. Please check your email.')
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, changePasswordDto.oldPassword, changePasswordDto.newPassword);
  }

  @Delete('delete-account')
  @UseGuards(AuthGuard)
  async deleteAccount(@Req() req: Request) {
    return this.authService.deleteAccount(req.user.id);
  }

  @Get('oauth/connect/google')
  @UseGuards(GoogleOAuthGuard)
  async connectOauthGoogle() {}

  @Get('oauth/connect/github')
  @UseGuards(GithubOAuthGuard)
  async connectOauthGithub() {}

  @Get('oauth/callback/google')
  @UseGuards(GoogleOAuthGuard)
  async oauthCallbackGoogle(@Req() req: Request & { user: { data: SignInResponse } }, @Res() res: Response) {
    return this.authService.callbackOauth(req, res);
  }

  @Get('oauth/callback/github')
  @UseGuards(GithubOAuthGuard)
  async oauthCallbackGithub(@Req() req: Request & { user: { data: SignInResponse } }, @Res() res: Response) {
    return this.authService.callbackOauth(req, res);
  }
}
