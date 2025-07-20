import { Module } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { AnswersModule } from '../modules/answers/answers.module';
import { BaseGateway } from './base.gateway';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [AuthModule, AnswersModule, TokensModule, UsersModule],
  providers: [BaseGateway, WsAuthGuard],
})
export class SocketsModule {}
