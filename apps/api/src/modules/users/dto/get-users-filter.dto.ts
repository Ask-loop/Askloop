import { PaginationOptions } from '@common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum OrderByUser {
  NEW = 'new',
  TOP = 'top',
  POPULAR = 'popular',
}

export enum OrderByDate {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class GetUsersFilterDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: OrderByUser })
  @IsEnum(OrderByUser)
  @IsOptional()
  orderByUser?: OrderByUser;

  @ApiPropertyOptional({ enum: OrderByDate })
  @IsEnum(OrderByDate)
  @IsOptional()
  orderByDate?: OrderByDate;
}
