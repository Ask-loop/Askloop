import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';

export interface ReputationEvent {
  id: string;
  userId: number;
  type: ReputationEventType;
  points: number;
  reason: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export enum ReputationEventType {
  QUESTION_UPVOTED = 'question_upvoted',
  QUESTION_DOWNVOTED = 'question_downvoted',
  ANSWER_UPVOTED = 'answer_upvoted',
  ANSWER_DOWNVOTED = 'answer_downvoted',
  ANSWER_ACCEPTED = 'answer_accepted',
  COMMENT_UPVOTED = 'comment_upvoted',
  COMMENT_DOWNVOTED = 'comment_downvoted',
  FIRST_QUESTION = 'first_question',
  FIRST_ANSWER = 'first_answer',
  FIRST_ACCEPTED_ANSWER = 'first_accepted_answer',
  DAILY_LOGIN = 'daily_login',
  WEEKLY_ACTIVE = 'weekly_active',
  MONTHLY_ACTIVE = 'monthly_active',
  HELPFUL_ANSWER = 'helpful_answer',
  EXCELLENT_QUESTION = 'excellent_question',
  MODERATION_ACTION = 'moderation_action',
  SPAM_DETECTED = 'spam_detected',
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: BadgeRequirement;
  awardedAt?: Date;
}

export enum BadgeCategory {
  CONTRIBUTOR = 'contributor',
  EXPERT = 'expert',
  HELPER = 'helper',
  MODERATOR = 'moderator',
  SPECIAL = 'special',
}

export interface BadgeRequirement {
  type: 'reputation' | 'questions' | 'answers' | 'accepted_answers' | 'days_active' | 'votes_received';
  value: number;
  timeframe?: number; // in days
}

export interface UserLevel {
  level: number;
  name: string;
  minReputation: number;
  maxReputation: number;
  privileges: string[];
}

export interface ReputationHistory {
  userId: number;
  events: ReputationEvent[];
  totalPoints: number;
  currentLevel: UserLevel;
  badges: Badge[];
  streak: number; // consecutive days active
}

@Injectable()
export class UserReputationService {
  private readonly reputationPoints = {
    [ReputationEventType.QUESTION_UPVOTED]: 10,
    [ReputationEventType.QUESTION_DOWNVOTED]: -2,
    [ReputationEventType.ANSWER_UPVOTED]: 15,
    [ReputationEventType.ANSWER_DOWNVOTED]: -2,
    [ReputationEventType.ANSWER_ACCEPTED]: 25,
    [ReputationEventType.COMMENT_UPVOTED]: 5,
    [ReputationEventType.COMMENT_DOWNVOTED]: -1,
    [ReputationEventType.FIRST_QUESTION]: 50,
    [ReputationEventType.FIRST_ANSWER]: 50,
    [ReputationEventType.FIRST_ACCEPTED_ANSWER]: 100,
    [ReputationEventType.DAILY_LOGIN]: 1,
    [ReputationEventType.WEEKLY_ACTIVE]: 10,
    [ReputationEventType.MONTHLY_ACTIVE]: 50,
    [ReputationEventType.HELPFUL_ANSWER]: 20,
    [ReputationEventType.EXCELLENT_QUESTION]: 30,
    [ReputationEventType.MODERATION_ACTION]: 5,
    [ReputationEventType.SPAM_DETECTED]: -50,
  };

  private readonly userLevels: UserLevel[] = [
    { level: 1, name: 'New User', minReputation: 0, maxReputation: 99, privileges: ['ask_questions', 'answer_questions'] },
    { level: 2, name: 'Contributor', minReputation: 100, maxReputation: 499, privileges: ['comment', 'vote', 'edit_own'] },
    { level: 3, name: 'Helper', minReputation: 500, maxReputation: 999, privileges: ['edit_others', 'close_questions'] },
    { level: 4, name: 'Expert', minReputation: 1000, maxReputation: 4999, privileges: ['moderate', 'delete_own'] },
    { level: 5, name: 'Master', minReputation: 5000, maxReputation: 9999, privileges: ['delete_others', 'ban_users'] },
    { level: 6, name: 'Legend', minReputation: 10000, maxReputation: Infinity, privileges: ['all_privileges'] },
  ];

  private readonly badges: Badge[] = [
    {
      id: 'first_question',
      name: 'First Question',
      description: 'Asked your first question',
      icon: '🎯',
      category: BadgeCategory.CONTRIBUTOR,
      requirement: { type: 'questions', value: 1 },
    },
    {
      id: 'first_answer',
      name: 'First Answer',
      description: 'Provided your first answer',
      icon: '💡',
      category: BadgeCategory.CONTRIBUTOR,
      requirement: { type: 'answers', value: 1 },
    },
    {
      id: 'first_accepted',
      name: 'First Accepted',
      description: 'Had your first answer accepted',
      icon: '✅',
      category: BadgeCategory.HELPER,
      requirement: { type: 'accepted_answers', value: 1 },
    },
    {
      id: 'bronze_contributor',
      name: 'Bronze Contributor',
      description: 'Reached 100 reputation points',
      icon: '🥉',
      category: BadgeCategory.CONTRIBUTOR,
      requirement: { type: 'reputation', value: 100 },
    },
    {
      id: 'silver_contributor',
      name: 'Silver Contributor',
      description: 'Reached 500 reputation points',
      icon: '🥈',
      category: BadgeCategory.EXPERT,
      requirement: { type: 'reputation', value: 500 },
    },
    {
      id: 'gold_contributor',
      name: 'Gold Contributor',
      description: 'Reached 1000 reputation points',
      icon: '🥇',
      category: BadgeCategory.EXPERT,
      requirement: { type: 'reputation', value: 1000 },
    },
    {
      id: 'helpful_answer',
      name: 'Helpful Answer',
      description: 'Provided 10 helpful answers',
      icon: '🤝',
      category: BadgeCategory.HELPER,
      requirement: { type: 'answers', value: 10 },
    },
    {
      id: 'question_master',
      name: 'Question Master',
      description: 'Asked 50 questions',
      icon: '❓',
      category: BadgeCategory.CONTRIBUTOR,
      requirement: { type: 'questions', value: 50 },
    },
    {
      id: 'answer_master',
      name: 'Answer Master',
      description: 'Provided 100 answers',
      icon: '💬',
      category: BadgeCategory.EXPERT,
      requirement: { type: 'answers', value: 100 },
    },
    {
      id: 'accepted_master',
      name: 'Accepted Master',
      description: 'Had 25 answers accepted',
      icon: '🏆',
      category: BadgeCategory.EXPERT,
      requirement: { type: 'accepted_answers', value: 25 },
    },
  ];

  async awardPoints(userId: number, eventType: ReputationEventType, reason: string, metadata?: Record<string, any>): Promise<ReputationEvent> {
    const points = this.reputationPoints[eventType] || 0;

    const event: ReputationEvent = {
      id: this.generateId(),
      userId,
      type: eventType,
      points,
      reason,
      metadata,
      createdAt: new Date(),
    };

    // Store event
    // await this.cacheService.set(
    //   `reputation_event:${event.id}`,
    //   event,
    //   { ttl: 86400 * 365, prefix: 'reputation' }
    // );

    // Update user reputation
    await this.updateUserReputation(userId, points);

    // Check for level up
    await this.checkLevelUp(userId);

    // Check for badges
    await this.checkBadges(userId);

    // Emit real-time update
    // await this.websocketService.emitUserActivity(userId, {
    //   type: 'reputation_update',
    //   event,
    //   newReputation: await this.calculateReputation(userId),
    // });

    return event;
  }

  async calculateReputation(userId: number): Promise<number> {
    // const cached = await this.cacheService.get<number>(`reputation:${userId}`, 'user');
    // if (cached !== null) return cached;

    // Calculate from events
    const events = await this.getUserReputationEvents(userId);
    const totalPoints = events.reduce((sum, event) => sum + event.points, 0);

    // Cache result
    // await this.cacheService.set(`reputation:${userId}`, totalPoints, { ttl: 3600, prefix: 'user' });

    return totalPoints;
  }

  async getUserLevel(userId: number): Promise<UserLevel> {
    const reputation = await this.calculateReputation(userId);

    const level = this.userLevels.find(l => reputation >= l.minReputation && reputation <= l.maxReputation) || this.userLevels[0];

    return level;
  }

  async getUserBadges(userId: number): Promise<Badge[]> {
    // const cached = await this.cacheService.get<Badge[]>(`badges:${userId}`, 'user');
    // if (cached) return cached;

    const userStats = await this.getUserStats(userId);
    const earnedBadges: Badge[] = [];

    for (const badge of this.badges) {
      if (await this.hasEarnedBadge(userId, badge, userStats)) {
        earnedBadges.push({ ...badge, awardedAt: new Date() });
      }
    }

    // Cache badges
    // await this.cacheService.set(`badges:${userId}`, earnedBadges, { ttl: 3600, prefix: 'user' });

    return earnedBadges;
  }

  async getReputationHistory(userId: number): Promise<ReputationHistory> {
    const events = await this.getUserReputationEvents(userId);
    const totalPoints = events.reduce((sum, event) => sum + event.points, 0);
    const currentLevel = await this.getUserLevel(userId);
    const badges = await this.getUserBadges(userId);
    const streak = await this.calculateStreak(userId);
    1;
    return {
      userId,
      events,
      totalPoints,
      currentLevel,
      badges,
      streak,
    };
  }

  async getLeaderboard(limit = 10): Promise<Array<{ userId: number; reputation: number; level: UserLevel }>> {
    // This would query your database for top users
    // For now, return empty array
    return [];
  }

  private async updateUserReputation(userId: number, points: number): Promise<void> {
    const currentReputation = await this.calculateReputation(userId);
    const newReputation = currentReputation + points;

    // await this.cacheService.set(`reputation:${userId}`, newReputation, { ttl: 3600, prefix: 'user' });
  }

  private async checkLevelUp(userId: number): Promise<void> {
    const currentLevel = await this.getUserLevel(userId);
    const reputation = await this.calculateReputation(userId);

    const nextLevel = this.userLevels.find(l => l.level === currentLevel.level + 1);

    if (nextLevel && reputation >= nextLevel.minReputation) {
      // await this.websocketService.emitUserActivity(userId, {
      //   type: 'level_up',
      //   newLevel: nextLevel,
      //   oldLevel: currentLevel,
      // });
    }
  }

  private async checkBadges(userId: number): Promise<void> {
    const userStats = await this.getUserStats(userId);
    const currentBadges = await this.getUserBadges(userId);
    const currentBadgeIds = currentBadges.map(b => b.id);

    for (const badge of this.badges) {
      if (!currentBadgeIds.includes(badge.id) && (await this.hasEarnedBadge(userId, badge, userStats))) {
        const earnedBadge = { ...badge, awardedAt: new Date() };

        // await this.websocketService.emitUserActivity(userId, {
        //   type: 'badge_earned',
        //   badge: earnedBadge,
        // });
      }
    }
  }

  private async hasEarnedBadge(userId: number, badge: Badge, userStats: any): Promise<boolean> {
    switch (badge.requirement.type) {
      case 'reputation':
        return userStats.reputation >= badge.requirement.value;
      case 'questions':
        return userStats.questionsCount >= badge.requirement.value;
      case 'answers':
        return userStats.answersCount >= badge.requirement.value;
      case 'accepted_answers':
        return userStats.acceptedAnswersCount >= badge.requirement.value;
      case 'days_active':
        return userStats.daysActive >= badge.requirement.value;
      case 'votes_received':
        return userStats.votesReceived >= badge.requirement.value;
      default:
        return false;
    }
  }

  private async getUserReputationEvents(userId: number): Promise<ReputationEvent[]> {
    // This would query your database for user reputation events
    // For now, return empty array
    return [];
  }

  private async getUserStats(userId: number): Promise<any> {
    // This would get user statistics from your database
    return {
      reputation: await this.calculateReputation(userId),
      questionsCount: 0,
      answersCount: 0,
      acceptedAnswersCount: 0,
      daysActive: 0,
      votesReceived: 0,
    };
  }

  private async calculateStreak(userId: number): Promise<number> {
    // This would calculate consecutive days active
    return 0;
  }

  private generateId(): string {
    return `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
