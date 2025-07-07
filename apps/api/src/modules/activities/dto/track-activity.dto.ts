import { IsEnum, IsOptional, IsObject, IsNumber, IsString } from 'class-validator';
import { ActivityType } from '@common/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackActivityDto {
  @ApiProperty({ enum: ActivityType })
  @IsEnum(ActivityType)
  type: ActivityType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class BadgeMetadataDto {
  @ApiProperty()
  @IsString()
  badgeType: 'gold' | 'silver' | 'bronze';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  count?: number;
}

export class QuestionMetadataDto {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;
}

export class AnswerMetadataDto {
  @ApiProperty()
  @IsNumber()
  answerId: number;

  @ApiProperty()
  @IsNumber()
  questionId: number;
}

export class VoteMetadataDto {
  @ApiProperty()
  @IsNumber()
  targetId: number;

  @ApiProperty()
  @IsString()
  targetType: 'question' | 'answer' | 'comment';

  @ApiProperty()
  @IsNumber()
  value: 1 | -1;
}
