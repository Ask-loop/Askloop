import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersStatsService } from './users-stats.service';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { RedisModule } from '@modules/redis/redis.module';
import { ActivitiesModule } from '@modules/activities/activities.module';

@Module({
  imports: [AccountsModule, TokensModule, RedisModule, ActivitiesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersStatsService],
  exports: [UsersService, UsersStatsService],
})
export class UsersModule {}
