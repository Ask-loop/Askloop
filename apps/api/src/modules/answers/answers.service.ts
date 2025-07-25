import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Answer } from './entities/answer.entity';
import { User } from '@modules/users/entities/user.entity';
import { Question } from '@modules/questions/entities/question.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  async createAnswer(dto: CreateAnswerDto, userId: number): Promise<Answer> {
    const { questionId, content } = dto;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const question = await Question.findOne({ where: { id: questionId } });

    if (!question) throw new NotFoundException('Question not found');

    if (!content || content.trim().length === 0) throw new BadRequestException('Content is required');

    const answer = Answer.create({ content, user, question });

    await answer.save();

    question.answersCount++;

    await question.save();

    return answer;
  }

  async deleteAnswer(answerId: number) {
    const answer = await Answer.findOne({
      where: { id: answerId },
      relations: ['question'],
    });

    if (!answer) throw new NotFoundException('Answer not found');

    await answer.remove();

    answer.question.answersCount--;

    await answer.question.save();
  }

  async getAnswersByQuestion(questionId: number) {
    const answers = await Answer.find({ where: { question: { id: questionId } } });

    return answers;
  }
}
