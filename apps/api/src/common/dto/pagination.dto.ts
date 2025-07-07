import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;
}
