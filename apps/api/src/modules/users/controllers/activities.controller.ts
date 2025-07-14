import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActivitiesService } from '../services/activities.service';
import { ApiTags } from '@nestjs/swagger';
import { GetActivitiesByTypeFilterDto, GetActivitiesFilterDto, GetRecentActivitiesFilterDto } from '../dto';

@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get('user/:userId')
  async getUserActivities(@Param('userId') userId: number, @Query() query: GetActivitiesFilterDto) {
    return await this.activitiesService.getUserActivities(userId, query);
  }

  @Get('type')
  async getActivitiesByType(@Query() query: GetActivitiesByTypeFilterDto) {
    return await this.activitiesService.getActivitiesByType(query);
  }

  @Get('recent')
  async getRecentActivities(@Query() query: GetRecentActivitiesFilterDto) {
    return await this.activitiesService.getRecentActivities(query);
  }
}
