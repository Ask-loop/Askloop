import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetQuestionsFilterDto, SortBy } from './dto/get-questions-filter.dto';
import { Question } from './entities/question.entity';
import { UsersService } from '@modules/users/services';
import { CreateQuestionDto } from './dto/create-question.dto';
import { TagsService } from '@modules/tags/tags.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ActivitiesService } from '@modules/users/services/activities.service';
import { ActivityType, VoteType } from '@common/enums';
import { RedisService } from '@shared/redis/redis.service';
import { QuestionVoteService } from './services/question-vote.service';
import { Tag } from '@modules/tags/entities/tag.entity';
import { In } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly activitiesService: ActivitiesService,
    private readonly redisService: RedisService,
    private readonly questionVoteService: QuestionVoteService,
  ) {}

  async getQuestions(filter: GetQuestionsFilterDto, ipOrUserId: string) {
    try {
      const { page = 1, limit = 10, sortBy = SortBy.NEWEST, userId, tagIds } = filter;

      const query = Question.createQueryBuilder('question')
        .leftJoin('question.user', 'user')
        .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName'])
        .leftJoinAndSelect('question.tags', 'tags');

      if (userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        query.andWhere('question.userId = :userId', { userId });
      }

      if (tagIds?.length) {
        query.andWhere('tags.id IN (:...tagIds)', { tagIds });
      }

      switch (sortBy) {
        case SortBy.UPDATED:
          query.orderBy('question.updatedAt', 'DESC');
          break;
        case SortBy.VIEWS:
          query.orderBy('question.views', 'DESC');
          break;
        case SortBy.ANSWERS:
          query.orderBy('question.answersCount', 'DESC');
          break;
        case SortBy.VOTES:
          query
            .leftJoin('question.votes', 'votes')
            .addSelect('COUNT(votes.id)', 'score')
            .groupBy('question.id')
            .addGroupBy('user.id')
            .addGroupBy('user.displayName')
            .addGroupBy('user.picture')
            .addGroupBy('user.firstName')
            .addGroupBy('user.lastName')
            .addGroupBy('tags.id')
            .orderBy('score', 'DESC');
          break;

        case SortBy.TRENDING:
          query
            .leftJoin('question.votes', 'votes')
            .addSelect('COUNT(votes.id)', 'votesCount')
            .addSelect(`((COUNT(votes.id) + question.answersCount + question.views) / GREATEST(EXTRACT(EPOCH FROM NOW() - question.createdAt) / 3600, 1))`, 'trendingScore')
            .groupBy('question.id')
            .addGroupBy('user.id')
            .addGroupBy('user.displayName')
            .addGroupBy('user.picture')
            .addGroupBy('user.firstName')
            .addGroupBy('user.lastName')
            .addGroupBy('tags.id')
            .addOrderBy(`((COUNT(votes.id) + question.answersCount + question.views) / GREATEST(EXTRACT(EPOCH FROM NOW() - question.createdAt) / 3600, 1))`, 'DESC');
          break;

        case SortBy.HOT:
          query
            .leftJoin('question.votes', 'votes')
            .addSelect('COUNT(votes.id)', 'votesCount')
            .addSelect(`((COUNT(votes.id) * 2 + question.answersCount) / POWER(GREATEST(EXTRACT(EPOCH FROM NOW() - question.createdAt) / 3600, 1), 1.5))`, 'hotScore')
            .groupBy('question.id')
            .addGroupBy('user.id')
            .addGroupBy('user.displayName')
            .addGroupBy('user.picture')
            .addGroupBy('user.firstName')
            .addGroupBy('user.lastName')
            .addGroupBy('tags.id')
            .addOrderBy(`((COUNT(votes.id) * 2 + question.answersCount) / POWER(GREATEST(EXTRACT(EPOCH FROM NOW() - question.createdAt) / 3600, 1), 1.5))`, 'DESC');
          break;

        case SortBy.WEEK:
          query
            .andWhere("question.createdAt >= NOW() - INTERVAL '7 days'")
            .leftJoin('question.votes', 'votes')
            .addSelect('COUNT(votes.id)', 'votesCount')
            .groupBy('question.id')
            .addGroupBy('user.id')
            .addGroupBy('user.displayName')
            .addGroupBy('user.picture')
            .addGroupBy('user.firstName')
            .addGroupBy('user.lastName')
            .addGroupBy('tags.id')
            .orderBy('votesCount', 'DESC');
          break;

        default:
          query.orderBy('question.createdAt', 'DESC');
          break;
      }

      query.skip((page - 1) * limit);
      query.take(limit);

      const [questions, total] = await Promise.all([query.getMany(), query.getCount()]);
      const viewedQuestions = await Promise.all(
        questions.map(async question => {
          const key = `question:viewed:${question.slug}:${ipOrUserId}`;
          const alreadyViewed = await this.redisService.get(key);

          return {
            ...question,
            viewed: !!alreadyViewed,
          };
        }),
      );

      return {
        questions: viewedQuestions,
        total,
      };
    } catch (error) {
      console.log(error);
    }
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

    return {
      ...question,
      viewed: !!alreadyViewed,
    };
  }

  async updateQuestionScore(questionId: number) {
    const question = await Question.findOne({ where: { id: questionId }, relations: ['votes'] });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const upVotes = question.votes.filter(vote => vote.vote === VoteType.Up).length;
    const downVotes = question.votes.filter(vote => vote.vote === VoteType.Down).length;

    question.score = upVotes - downVotes;

    await question.save();
  }

  async createQuestion(createQuestionDto: CreateQuestionDto, userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { title, body, tagIds } = createQuestionDto;

    const existingQuestionWithSameTitle = await Question.findOne({ where: { title } });
    if (existingQuestionWithSameTitle) {
      throw new BadRequestException('Question with this title already exists');
    }

    const tags = await this.tagsService.findOrCreateTags(tagIds, userId);

    const question = await Question.create({
      title,
      body,
      tags,
      user,
    }).save();

    if (!question) {
      throw new BadRequestException('Question not created');
    }

    await this.updateQuestionScore(question.id);

    await this.activitiesService.trackActivity(userId, ActivityType.Question, { questionId: question.id, title: question.title });

    return question;
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

    await this.updateQuestionScore(question.id);

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

  async getAnswersByQuestion(questionId: number) {
    const question = await Question.findOne({ where: { id: questionId }, relations: ['answers'] });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question.answers;
  }

  async getRelatedQuestions(questionId: number, limit = 5) {
    const question = await Question.findOne({ where: { id: questionId }, relations: ['tags'] });

    if (!question) throw new NotFoundException('Question not found');

    const tagIds = question.tags.map(tag => tag.id);

    const relatedQuestions = await Question.createQueryBuilder('q')
      .leftJoinAndSelect('q.tags', 'tag')
      .where('q.id != :questionId', { questionId })
      .andWhere('tag.id IN (:...tagIds)', { tagIds })
      .groupBy('q.id')
      .addGroupBy('tag.id')
      .orderBy('COUNT(tag.id)', 'DESC')
      .limit(limit)
      .getMany();

    return relatedQuestions;
  }

  async searchSimilarQuestions(value: string, limit = 5) {
    return Question.query(
      `
       SELECT id, title
    FROM question
    WHERE search_vector @@ plainto_tsquery($1)
    ORDER BY ts_rank(search_vector, plainto_tsquery($1)) DESC
    LIMIT $2
    `,
      [value, limit],
    );
  }
}
