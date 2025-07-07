import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationOptions } from '@common/dto/pagination.dto';
import { ActivityType } from '@common/types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetActivitiesFilterDto extends PaginationOptions {}

export class GetActivitiesByTypeFilterDto extends PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: ActivityType;
}

export class GetRecentActivitiesFilterDto extends PaginationOptions {}
