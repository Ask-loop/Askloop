import { Cookies } from '@common/constants/cookies';
import { TokensService } from '@modules/tokens/tokens.service';
import { UsersService } from '@modules/users/services/users.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { parse } from 'cookie';
import { TokensDto } from '@modules/tokens/dto/tokens.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const cookies = parse(request.headers.cookie || '');

    const userCookie = JSON.parse(cookies[Cookies.USER] || '{}');

    if (!userCookie?.accessToken) return false;

    try {
      const userId = await this.tokensService.decodeAccessToken(userCookie.accessToken);

      const isBlacklisted = await this.tokensService.isAccessTokenBlacklisted(userId, userCookie.accessToken);

      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked. Please sign in again.');
      }

      const user = await this.usersService.findById(userId);

      if (!user) return false;

      request.user = user;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired. Please sign in again.');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token. Please sign in again.');
      }

      throw new UnauthorizedException('Invalid token. Please sign in again.');
    }
  }
}
