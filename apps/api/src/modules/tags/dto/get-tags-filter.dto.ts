import { PaginationOptions } from '@common/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum OrderByTag {
  NEWEST = 'newest',
  NAME = 'name',
  POPULAR = 'popular',
}

export class GetTagsFilterDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: OrderByTag })
  @IsOptional()
  @IsEnum(OrderByTag)
  orderByTag?: OrderByTag;
}
