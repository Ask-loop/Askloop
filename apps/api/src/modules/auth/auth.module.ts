import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '@modules/mail/mail.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { RedisModule } from '@modules/redis/redis.module';
import { CleanupService } from './cleanup.service';

@Module({
  imports: [ConfigModule, PassportModule, UsersModule, TokensModule, AccountsModule, MailModule, RedisModule],
  providers: [AuthService, GoogleStrategy, GithubStrategy, CleanupService],
  controllers: [AuthController],
})
export class AuthModule {}
