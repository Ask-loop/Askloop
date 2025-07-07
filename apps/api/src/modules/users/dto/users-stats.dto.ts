import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateReputationDto {
  @ApiProperty()
  @IsNumber()
  points: number;
}

export class UpdateBadgesDto {
  @ApiProperty()
  @IsNumber()
  gold: number;

  @ApiProperty()
  @IsNumber()
  silver: number;

  @ApiProperty()
  @IsNumber()
  bronze: number;
}
