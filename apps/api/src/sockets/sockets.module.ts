import { Module } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { BaseGateway } from './base.gateway';
import { UsersModule } from '@modules/users/users.module';
import { AnswersGateway } from '@modules/answers/answers.gateway';

@Module({
  imports: [AuthModule, TokensModule, UsersModule],
  providers: [BaseGateway, WsAuthGuard, AnswersGateway],
})
export class SocketsModule {}
