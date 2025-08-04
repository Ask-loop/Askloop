import { IsOptional, IsString, IsEnum, IsNumber, IsArray, IsBoolean } from 'class-validator';
import { PaginationOptions } from '@common/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum SortBy {
  NEWEST = 'createdAt',
  UPDATED = 'updatedAt',

  VIEWS = 'views',
  ANSWERS = 'answersCount',
  VOTES = 'votesCount',
  TRENDING = 'trendingScore',

  HOT = 'hotScore',
  WEEK = 'weeklyScore',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetQuestionsFilterDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: number;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
  @IsArray()
  tagIds?: number[];

  @ApiPropertyOptional({ enum: SortBy })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.NEWEST;
}
