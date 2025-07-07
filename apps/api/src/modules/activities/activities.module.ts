import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { UsersStatsService } from '@modules/users/users-stats.service';
import { TokensModule } from '@modules/tokens/tokens.module';

@Module({
  imports: [TokensModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, UsersStatsService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
