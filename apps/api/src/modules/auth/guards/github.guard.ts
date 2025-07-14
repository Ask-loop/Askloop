import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationMethod } from '@common/enums';

@Injectable()
export class GithubOAuthGuard extends AuthGuard(AuthenticationMethod.GITHUB) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean;
  }
}
