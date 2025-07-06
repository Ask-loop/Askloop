import { RedisService } from '@modules/redis/redis.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { comparePasswords, hashPassword } from '@shared/utils/password';

@Injectable()
export class TokensService {
  private readonly VERIFICATION_TOKEN_EXPIRY = 600;
  private readonly PASSWORD_RESET_TOKEN_EXPIRY = 600;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  private get accessSecret() {
    return this.config.get<string>('jwt.accessTokenSecret');
  }

  private get refreshSecret() {
    return this.config.get<string>('jwt.refreshTokenSecret');
  }

  private get accessExpiresIn() {
    const val = this.config.get<string | number>('jwt.accessTokenExpiresIn');
    return typeof val === 'string' ? this.parseExpiry(val) : Number(val);
  }

  private get refreshExpiresInSeconds() {
    const val = this.config.get<string | number>('jwt.refreshTokenExpiresIn');
    return typeof val === 'string' ? this.parseExpiry(val) : Number(val);
  }

  private parseExpiry(value: string): number {
    if (value.endsWith('d')) return parseInt(value) * 86400;
    if (value.endsWith('h')) return parseInt(value) * 3600;
    if (value.endsWith('m')) return parseInt(value) * 60;
    if (value.endsWith('s')) return parseInt(value);
    return parseInt(value);
  }

  async generateTokens(userId: number) {
    const rotationId = uuidv4();

    const accessToken = await this.jwt.signAsync(
      { sub: userId, type: 'access' },
      {
        secret: this.accessSecret,
        expiresIn: this.accessExpiresIn,
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId, type: 'refresh', rotationId },
      {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresInSeconds,
      },
    );

    const hashed = await hashPassword(refreshToken);

    const refreshTokenKey = `refresh_token:${userId}:${rotationId}`;
    const accessTokenKey = `access_token:${userId}`;

    await this.redisService.set(refreshTokenKey, hashed, this.refreshExpiresInSeconds);
    await this.redisService.set(accessTokenKey, accessToken, this.accessExpiresIn);

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(userId: number) {
    const accessTokenKey = `access_token:${userId}`;

    const accessToken = await this.redisService.get(accessTokenKey);

    if (!accessToken) throw new UnauthorizedException('Invalid access token');

    await this.jwt.verifyAsync(accessToken, { secret: this.accessSecret });

    return { accessToken };
  }

  async decodeAccessToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.accessSecret,
      });
      return payload.sub as number;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async decodeRefreshToken(token: string): Promise<{ userId: number; rotationId: string }> {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.refreshSecret,
      });

      return { userId: payload.sub as number, rotationId: payload.rotationId as string };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyRefreshToken(token: string, userId: number, rotationId: string) {
    const redisKey = `refresh_token:${userId}:${rotationId}`;
    const storedHash = await this.redisService.get(redisKey);

    if (!storedHash || !(await comparePasswords(token, storedHash))) {
      await this.revokeAllRefreshTokens(userId);
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.redisService.del(redisKey);
  }

  async revokeAllRefreshTokens(userId: number) {
    const keys = await this.redisService.keys(`refresh_token:${userId}:*`);
    for (const key of keys) {
      await this.redisService.del(key);
    }
  }

  async revokeRefreshToken(userId: number, rotationId: string) {
    const redisKey = `refresh_token:${userId}:${rotationId}`;
    await this.redisService.del(redisKey);
  }

  async storeEmailVerificationToken(email: string) {
    const token = uuidv4();

    const redisKey = `verification:email:${token}`;

    await this.redisService.set(redisKey, email, this.VERIFICATION_TOKEN_EXPIRY);

    return token;
  }

  async storePasswordResetToken(email: string) {
    const token = uuidv4();

    const redisKey = `password_reset:${token}`;

    await this.redisService.set(redisKey, email, this.PASSWORD_RESET_TOKEN_EXPIRY);

    return token;
  }

  async verifyPasswordResetToken(token: string) {
    const redisKey = `password_reset:${token}`;

    const storedEmail = await this.redisService.get(redisKey);

    if (!storedEmail) throw new UnauthorizedException('Invalid or expired password reset token');

    await this.redisService.del(redisKey);

    return storedEmail;
  }

  async verifyEmailVerificationToken(token: string) {
    const redisKey = `verification:email:${token}`;

    const storedEmail = await this.redisService.get(redisKey);
    if (!storedEmail) throw new UnauthorizedException('Invalid or expired email verification token');

    await this.redisService.del(redisKey);

    return storedEmail;
  }
}
