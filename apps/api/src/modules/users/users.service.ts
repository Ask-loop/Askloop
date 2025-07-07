import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { OauthProfile } from '@modules/auth/interfaces/oauth.interface';
import { AccountsService } from '@modules/accounts/accounts.service';
import { UsersStatsService } from './users-stats.service';
import { ActivitiesService } from '@modules/activities/activities.service';
import { ActivityType } from '@common/types';
import { FindManyOptions } from 'typeorm';
import { GetUsersFilterDto, OrderByDate, OrderByUser } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly usersStatsService: UsersStatsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async getUsers(filter: GetUsersFilterDto) {
    const { search, orderByUser = OrderByUser.NEW, orderByDate = OrderByDate.DAY, page = 1, limit = 10 } = filter;

    const query = User.createQueryBuilder('user').leftJoinAndSelect('user.questions', 'questions').leftJoinAndSelect('questions.tags', 'tags');

    if (search) {
      query.andWhere('user.name ILIKE :search', { search: `%${search}%` });
    }

    if (orderByDate) {
      const date = {
        [OrderByDate.DAY]: 1,
        [OrderByDate.WEEK]: 7,
        [OrderByDate.MONTH]: 30,
        [OrderByDate.YEAR]: 365,
      }[orderByDate];

      query.andWhere('questions.createdAt >= :date', {
        date: new Date(Date.now() - date * 24 * 60 * 60 * 1000),
      });
    }

    switch (orderByUser) {
      case OrderByUser.POPULAR:
        query.orderBy('user.questionCount', 'DESC');
        break;
      case OrderByUser.TOP:
        query.orderBy('user.reputation', 'DESC');
        break;
      default:
        query.orderBy('user.createdAt', 'DESC');
    }

    query.limit(limit);
    query.offset((page - 1) * limit);

    const [users, total] = await query.getManyAndCount();

    return {
      users,
      total,
    };
  }

  async getUser(id: number) {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await User.findOne({ where: { id }, relations: ['questions', 'tags'] });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserActivity(id: number) {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await User.findOne({ where: { id }, relations: ['questions', 'tags', 'stats', 'activities'] });

    if (!user) throw new NotFoundException('User not found');

    return {
      questions: user.questions,
      tags: user.tags,
      activities: user.activities,
    };
  }

  async create(dto: CreateUserDto) {
    const user = User.create(dto);
    const savedUser = await user.save();

    // Create user stats
    await this.usersStatsService.createUserStats(savedUser.id);

    // Track registration activity
    await this.activitiesService.trackActivity(savedUser.id, ActivityType.Registration);

    return savedUser;
  }

  async findMany(options: FindManyOptions<User>): Promise<User[]> {
    return User.find(options);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        provider: true,
        providerId: true,
        picture: true,
        firstName: true,
        lastName: true,
        about: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        picture: true,
        about: true,
        createdAt: true,
        updatedAt: true,
        firstName: true,
        lastName: true,
        role: true,
        questions: true,
        tags: true,
      },
    });
  }

  async update(id: number, dto: Partial<User>): Promise<User | null> {
    await User.update(id, dto);

    return User.findOne({ where: { id } });
  }

  async createOauthUser(profile: OauthProfile): Promise<User> {
    const user = await this.create({
      email: profile.email,
      provider: profile.provider,
      providerId: profile.providerId,
      picture: profile.avatar,
      emailVerified: true,
    });

    await this.accountsService.createOAuthUser(profile.provider, profile.providerId, user);

    await this.activitiesService.trackActivity(user.id, ActivityType.Registration);

    return user;
  }

  async delete(id: number) {
    if (!id) throw new BadRequestException('User ID is required');

    const user = await User.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.accountsService.deleteUserAccounts(id);

    await User.delete(id);

    return { message: 'User deleted successfully' };
  }
}
