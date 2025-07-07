import { IsOptional, IsString, IsEnum, IsNumber, IsArray } from 'class-validator';
import { PaginationOptions } from '@common/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum OrderBy {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
}

export class GetQuestionsFilterDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @ApiPropertyOptional({ enum: SortBy })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.CREATED_AT;

  @ApiPropertyOptional({ enum: OrderBy })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy = OrderBy.NEWEST;
}
