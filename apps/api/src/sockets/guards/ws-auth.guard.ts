import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from '@modules/tokens/tokens.service';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { Cookies } from '@common/constants/cookies';
import { TokenExpiredError } from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UsersService } from '@modules/users/services';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient() as Socket;
    const cookies = parse(client.handshake?.headers?.cookie || '');

    const userCookie = JSON.parse(cookies[Cookies.USER] || '{}');

    if (!userCookie?.accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const userId = await this.tokensService.decodeAccessToken(userCookie?.accessToken);

      const isBlacklisted = await this.tokensService.isAccessTokenBlacklisted(userId, userCookie.accessToken);

      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked. Please sign in again.');
      }

      const user = await this.usersService.findById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found. Please sign in again.');
      }

      client.data.user = user;

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
