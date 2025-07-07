import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivityType } from '@common/types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetActivitiesByTypeFilterDto, GetActivitiesFilterDto, GetRecentActivitiesFilterDto } from './dto';

@Controller('activities')
@ApiTags('Activities')
@ApiBearerAuth('JWT-auth')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get('user/:userId')
  async getUserActivities(@Param('userId') userId: number, @Query() query: GetActivitiesFilterDto) {
    return await this.activitiesService.getUserActivities(userId, query);
  }

  @Get('type/:type')
  async getActivitiesByType(@Param('type') type: ActivityType, @Query() query: GetActivitiesByTypeFilterDto) {
    return await this.activitiesService.getActivitiesByType(type, query);
  }

  @Get('recent')
  async getRecentActivities(@Query() query: GetRecentActivitiesFilterDto) {
    return await this.activitiesService.getRecentActivities(query);
  }
}
