import { IsOptional } from 'class-validator';
import { PaginationOptions } from '@common/dto/pagination.dto';
import { ActivityType } from '@shared/types';
import { ApiProperty } from '@nestjs/swagger';

export class GetActivitiesFilterDto extends PaginationOptions {}

export class GetActivitiesByTypeFilterDto extends PaginationOptions {
  @ApiProperty({ enum: ActivityType })
  @IsOptional()
  type: ActivityType;
}

export class GetRecentActivitiesFilterDto extends PaginationOptions {}
