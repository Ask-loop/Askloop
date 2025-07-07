import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UsersStats } from './entities/users-stats.entity';
import { ActivityType } from '@common/types';
import { User } from './entities/user.entity';
import { UpdateBadgesDto, UpdateReputationDto } from './dto/users-stats.dto';
import { GetUserStatsFilterDto } from './dto/get-user-stats-filter.dto';
import { REPUTATION_RULES } from '@common/constants/reputation';

@Injectable()
export class UsersStatsService {
  constructor(private readonly connection: DataSource) {}

  async initUserStats(userId: number): Promise<UsersStats> {
    return this.connection.transaction(async manager => {
      const existingStats = await manager.findOne(UsersStats, {
        where: { user: { id: userId } },
        lock: { mode: 'pessimistic_write' },
      });

      if (existingStats) return existingStats;

      const user = await manager.findOneBy(User, { id: userId });
      if (!user) throw new NotFoundException('User not found');

      const newStats = manager.create(UsersStats, {
        user,
        reputation: 1,
        lastActiveAt: new Date(),
      });

      return await manager.save(newStats);
    });
  }

  async updateStats(userId: number, activityType: ActivityType): Promise<UsersStats> {
    return await this.connection.transaction(async manager => {
      const stats = await manager.findOne(UsersStats, {
        where: { user: { id: userId } },
        lock: { mode: 'pessimistic_write' },
      });

      if (!stats) throw new NotFoundException('User stats not found');

      const rule = REPUTATION_RULES[activityType];
      if (!rule) return stats;

      stats[rule.field] = (stats[rule.field] || 0) + 1;
      stats.reputation += Math.max(rule.point + stats.reputation, 0);
      stats.lastActiveAt = new Date();

      return await manager.save(stats);
    });
  }

  async getStats(userId: number): Promise<UsersStats> {
    const stats = await UsersStats.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!stats) throw new NotFoundException('User stats not found');
    return stats;
  }
}
