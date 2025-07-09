import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from '../entities/activity.entity';
import { ActivityType } from '@common/types';
import { UsersStatsService } from '@modules/users/services/users-stats.service';
import { GetActivitiesByTypeFilterDto, GetActivitiesFilterDto } from '../dto';
import { DataSource, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly usersStatsService: UsersStatsService,
    private readonly dataSource: DataSource,
  ) {}

  async trackActivity(userId: number, type: ActivityType, metadata: Record<string, any> = {}): Promise<Activity> {
    return this.dataSource.transaction(async manager => {
      const activity = manager.create(Activity, {
        user: { id: userId },
        type,
        metadata,
      });

      const savedActivity = await manager.save(activity);

      await this.usersStatsService.updateStats(userId, type);

      return savedActivity;
    });
  }

  async getPaginatedActivities(filter: GetActivitiesFilterDto, whereCallback?: (query: SelectQueryBuilder<Activity>) => void) {
    const { limit = 10, page = 1 } = filter;

    const query = Activity.createQueryBuilder('activity')
      .leftJoin('activity.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
      .orderBy('activity.createdAt', 'DESC')
      .take(limit)
      .skip((page - 1) * limit);

    if (whereCallback) {
      whereCallback(query);
    }

    return query.getManyAndCount();
  }

  async getUserActivities(userId: number, filter: GetActivitiesFilterDto) {
    const [activities, total] = await this.getPaginatedActivities(filter, query => {
      query.where('activity.user.id = :userId', { userId });
    });

    return {
      activities,
      total,
    };
  }

  async getActivitiesByType(filter: GetActivitiesByTypeFilterDto) {
    const [activities, total] = await this.getPaginatedActivities(filter, query => {
      query.where('activity.type = :type', { type: filter.type });
    });

    return { activities, total };
  }

  async getRecentActivities(filter: GetActivitiesFilterDto) {
    return this.getPaginatedActivities(filter, query => {
      query.where('activity.createdAt > :date', { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) });
    });
  }

  async getActivityById(activityId: number): Promise<Activity> {
    const activity = await Activity.createQueryBuilder('activity')
      .leftJoin('activity.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
      .where('activity.id = :id', { id: activityId })
      .getOne();

    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async deleteActivity(activityId: number, userId: number): Promise<void> {
    const result = await this.dataSource.transaction(async manager => {
      return await manager.delete(Activity, { id: activityId, user: { id: userId } });
    });
    if (result.affected === 0) {
      throw new NotFoundException('Activity not found');
    }
  }
}
