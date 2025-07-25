import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsInt()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional()
  authorId?: number;
}
