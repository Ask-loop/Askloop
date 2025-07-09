import { Module } from '@nestjs/common';
import { UsersController, ActivitiesController } from './controllers';
import { UsersService, UsersStatsService, ActivitiesService } from './services';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { RedisModule } from '@modules/redis/redis.module';

@Module({
  imports: [AccountsModule, TokensModule, RedisModule],
  controllers: [UsersController, ActivitiesController],
  providers: [UsersService, UsersStatsService, ActivitiesService],
  exports: [UsersService, UsersStatsService, ActivitiesService],
})
export class UsersModule {}
