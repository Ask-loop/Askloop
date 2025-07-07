import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from './entities/activity.entity';
import { ActivityType } from '@common/types';
import { UsersStatsService } from '@modules/users/users-stats.service';
import { GetActivitiesFilterDto } from './dto';
import { DataSource, MoreThan } from 'typeorm';

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

  async getUserActivities(userId: number, filter: GetActivitiesFilterDto) {
    const [activities, total] = await this.getPaginatedActivities(filter, {
      'activity.user.id': userId,
    });

    return {
      activities,
      total,
    };
  }

  async getPaginatedActivities(filter: GetActivitiesFilterDto, whereOptions: Record<string, any> = {}) {
    const { limit = 10, page = 1 } = filter;

    const query = Activity.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.user', 'user')
      .where(whereOptions)
      .orderBy('activity.createdAt', 'DESC')
      .take(limit)
      .skip((page - 1) * limit);

    return query.getManyAndCount();
  }

  async getActivitiesByType(type: ActivityType, filter: GetActivitiesFilterDto) {
    const [activities, total] = await this.getPaginatedActivities(filter, {
      'activity.type': type,
    });

    return { activities, total };
  }

  async getRecentActivities(filter: GetActivitiesFilterDto) {
    return this.getPaginatedActivities(filter, {
      'activity.createdAt': MoreThan(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    });
  }

  async getActivityById(activityId: number): Promise<Activity> {
    const activity = await this.dataSource.transaction(async manager => {
      return await manager.findOne(Activity, {
        where: { id: activityId },
        relations: ['user'],
      });
    });

    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async deleteActivity(activityId: number, userId: number): Promise<void> {
    const activity = await this.dataSource.transaction(async manager => {
      return await manager.findOne(Activity, {
        where: { id: activityId, user: { id: userId } },
      });
    });

    if (!activity) throw new NotFoundException('Activity not found');

    await this.dataSource.transaction(async manager => {
      await manager.delete(Activity, activity);
    });
  }
}
