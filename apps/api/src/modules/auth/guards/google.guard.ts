import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationMethod } from '@common/enums';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(AuthenticationMethod.GOOGLE) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean;
  }
}
