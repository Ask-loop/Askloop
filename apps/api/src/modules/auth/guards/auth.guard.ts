import { TokensService } from '@modules/tokens/tokens.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const authHeader = request.get('authorization');

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const userId = await this.tokensService.decodeAccessToken(token);

      request.user = { id: userId };
      return true;
    } catch (error) {
      return false;
    }
  }
}
