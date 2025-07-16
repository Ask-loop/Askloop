import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { Request } from 'express';
import { QuestionVoteService } from './services/question-vote.service';
import { VoteQuestionDto } from './dto/vote-question.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly questionVoteService: QuestionVoteService,
  ) {}

  @Get()
  getQuestions(@Query() filter: GetQuestionsFilterDto) {
    return this.questionsService.getQuestions(filter);
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionsService.getQuestionById(Number(id));
  }

  @Get('slug/:slug')
  getQuestionBySlug(@Param('slug') slug: string, @Req() req: Request) {
    return this.questionsService.getQuestionBySlug(slug, req?.ip || req?.headers['x-forwarded-for'] || req?.headers['x-real-ip']);
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard)
  voteQuestion(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Body() voteQuestionDto: VoteQuestionDto) {
    return this.questionVoteService.vote(id, req?.user?.id, voteQuestionDto.vote);
  }

  @Post()
  @UseGuards(AuthGuard)
  createQuestion(@Req() req: Request, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto, req?.user?.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateQuestion(@Req() req: Request, @Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(Number(id), updateQuestionDto, req?.user?.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteQuestion(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(Number(id));
  }

  @Get(':id/answers')
  getAnswersByQuestion(@Param('id') id: string) {
    return this.questionsService.getAnswersByQuestion(Number(id));
  }
}
