import { Module } from '@nestjs/common';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { AnswersModule } from '../modules/answers/answers.module';
import { EventsGateway } from './events.gateway';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [AuthModule, AnswersModule, TokensModule, UsersModule],
  providers: [EventsGateway, WsAuthGuard],
})
export class SocketsModule {}
