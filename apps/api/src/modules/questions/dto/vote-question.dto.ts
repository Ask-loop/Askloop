import { IsEnum, IsNotEmpty } from 'class-validator';
import { VoteType } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class VoteQuestionDto {
  @ApiProperty({ enum: VoteType })
  @IsNotEmpty()
  @IsEnum(VoteType)
  vote: VoteType;
}
