import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersModule } from '@modules/users/users.module';
import { TagsModule } from '@modules/tags/tags.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { ActivitiesModule } from '@modules/activities/activities.module';

@Module({
  imports: [UsersModule, TagsModule, TokensModule, ActivitiesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
