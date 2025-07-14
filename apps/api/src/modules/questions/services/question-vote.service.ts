import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Question } from '../entities/question.entity';
import { QuestionVote } from '../entities/question-vote.entity';
import { VoteType } from '@common/enums';

@Injectable()
export class QuestionVoteService {
  constructor() {}

  async vote(questionId: number, userId: number, voteType: VoteType) {
    const existingVote = await QuestionVote.findOne({ where: { question: { id: questionId }, user: { id: userId } } });

    const question = await Question.findOne({ where: { id: questionId } });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (userId === question.user.id) {
      throw new BadRequestException('You cannot vote on your own question');
    }

    if (existingVote) {
      if (existingVote.vote === voteType) {
        await existingVote.remove();

        // Emit real-time vote update
        // this.webSocketService.emitVoteUpdate(questionId, {
        //   questionId,
        //   score: question.score,
        //   upvotes: question.upvotes,
        //   downvotes: question.downvotes,
        //   action: 'removed',
        // });

        return;
      }

      existingVote.vote = voteType;
      const updatedVote = await existingVote.save();

      // Emit real-time vote update
      // this.webSocketService.emitVoteUpdate(questionId, {
      //   questionId,
      //   score: question.score,
      //   upvotes: question.upvotes,
      //   downvotes: question.downvotes,
      //   action: 'updated',
      // });

      return updatedVote;
    }

    const vote = QuestionVote.create({
      question,
      user: { id: userId },
      vote: voteType,
    });

    await vote.save();

    // Emit real-time vote update
    // this.webSocketService.emitVoteUpdate(questionId, {
    //   questionId,
    //   score: question.score,
    //   upvotes: question.upvotes,
    //   downvotes: question.downvotes,
    //   action: 'added',
    // });

    return vote;
  }

  async upvote(questionId: number, userId: number) {
    return this.vote(questionId, userId, VoteType.Up);
  }

  async downvote(questionId: number, userId: number) {
    return this.vote(questionId, userId, VoteType.Down);
  }
}
