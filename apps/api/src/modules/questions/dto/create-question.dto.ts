import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tagIds: string[];
}
