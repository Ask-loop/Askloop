import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import jwtConfig from '@config/jwt.config';
import oauthConfig from '@config/oauth.config';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import redisConfig from '@config/redis.config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisModule } from '@modules/redis/redis.module';
import { Redis } from 'ioredis';
import { MailModule } from '@modules/mail/mail.module';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { QuestionsModule } from '@modules/questions/questions.module';
import { TagsModule } from '@modules/tags/tags.module';
import { ActivitiesModule } from '@modules/activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, databaseConfig, oauthConfig, redisConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    CacheModule.register({
      isGlobal: true,
      imports: [RedisModule],
      inject: ['REDIS_CLIENT'],
      useFactory: (redisClient: Redis) => ({
        store: redisStore,
        client: redisClient,
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RedisModule,
    MailModule,
    AccountsModule,
    TokensModule,
    QuestionsModule,
    TagsModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
