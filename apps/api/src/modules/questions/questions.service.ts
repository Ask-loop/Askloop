import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { GetQuestionsFilterDto, OrderBy, SortBy } from './dto/get-questions-filter.dto';
import { Question } from './entities/question.entity';
import { UsersService } from '@modules/users/services';
import { CreateQuestionDto } from './dto/create-question.dto';
import { TagsService } from '@modules/tags/tags.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ActivitiesService } from '@modules/users/services/activities.service';
import { ActivityType } from '@common/enums';
import { RedisService } from '@shared/redis/redis.service';
import { QuestionVoteService } from './services/question-vote.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly activitiesService: ActivitiesService,
    private readonly redisService: RedisService,
    private readonly questionVoteService: QuestionVoteService,
  ) {}

  async getQuestions(filter: GetQuestionsFilterDto) {
    // prettier-ignore
    const { 
      page = 1, 
      limit = 10, 
      search, 
      sortBy = SortBy.CREATED_AT,
      orderBy = OrderBy.NEWEST,
      userId,
      tagIds,
    } = filter;

    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'body'];
    if (!allowedSortFields.includes(sortBy)) {
      throw new BadRequestException('Invalid sort field');
    }

    const query = Question.createQueryBuilder('question')
      .leftJoin('question.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
      .leftJoinAndSelect('question.tags', 'tags');

    if (search) {
      query.andWhere('question.title ILIKE :search', { search: `%${search}%` });
    }

    if (userId) {
      const user = await this.usersService.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      query.andWhere('question.userId = :userId', { userId: user.id });
    }

    if (tagIds?.length) {
      query.andWhere('tags.id IN (:...tagIds)', { tagIds });
    }

    query.orderBy(`question.${sortBy}`, orderBy === OrderBy.NEWEST ? 'DESC' : 'ASC');
    query.skip((page - 1) * limit);
    query.take(limit);

    const [questions, total] = await query.getManyAndCount();

    return {
      questions,
      total,
    };
  }

  async getQuestionById(id: number) {
    const question = await Question.createQueryBuilder('question')
      .leftJoin('question.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
      .leftJoinAndSelect('question.tags', 'tags')
      .where('question.id = :id', { id })
      .getOne();

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async getQuestionBySlug(slug: string, ip: string) {
    const question = await Question.createQueryBuilder('question')
      .leftJoin('question.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
      .leftJoinAndSelect('question.tags', 'tags')
      .where('question.slug = :slug', { slug })
      .getOne();

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const key = `question:viewed:${slug}:${ip}`;

    const alreadyViewed = await this.redisService.get(key);

    if (!alreadyViewed) {
      await this.redisService.set(key, 'true', 3600);
      await this.incrementViews(question.id);
    }

    return question;
  }

  async createQuestion(createQuestionDto: CreateQuestionDto, userId: number) {
    try {
      const user = await this.usersService.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { title, body, tagIds } = createQuestionDto;

      const existingQuestionWithSameTitle = await Question.findOne({ where: { title } });
      if (existingQuestionWithSameTitle) {
        throw new BadRequestException('Question with this title already exists');
      }

      const tags = await this.tagsService.findOrCreateTags(tagIds as string[], userId);

      await Promise.all(
        tags.map(tag => {
          tag.usageCount = (tag.usageCount || 0) + 1;
          return tag.save();
        }),
      );

      const question = await Question.create({
        title,
        body,
        tags,
        user,
      }).save();

      await this.activitiesService.trackActivity(userId, ActivityType.Question, { questionId: question.id, title: question.title });

      return question;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException('Failed to create question. Please try again later.');
    }
  }

  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto, userId: number) {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this question');
    }

    const { title, body, tagIds } = updateQuestionDto;

    if (title) {
      question.title = title;
    }

    if (body) {
      question.body = body;
    }

    if (tagIds) {
      const tags = await this.tagsService.findOrCreateTags(tagIds as string[], userId);
      question.tags = tags;
    }

    await this.activitiesService.trackActivity(userId, ActivityType.Edit, { questionId: question.id, title: question.title });

    return question.save();
  }

  async deleteQuestion(id: number) {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.activitiesService.trackActivity(question.user.id, ActivityType.Delete, { questionId: question.id, title: question.title });

    await question.remove();
    return question;
  }

  async incrementViews(id: number) {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    question.views++;
    await question.save();

    return question;
  }
}
