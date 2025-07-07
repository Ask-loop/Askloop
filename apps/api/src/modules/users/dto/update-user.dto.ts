import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  picture?: string;
}
