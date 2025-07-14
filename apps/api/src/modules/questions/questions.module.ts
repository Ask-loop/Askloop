import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersModule } from '@modules/users/users.module';
import { TagsModule } from '@modules/tags/tags.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { RedisModule } from '@shared/redis/redis.module';
import { QuestionVoteService } from './services/question-vote.service';

@Module({
  imports: [UsersModule, TagsModule, TokensModule, RedisModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionVoteService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
