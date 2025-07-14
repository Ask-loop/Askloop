import { IsEnum, IsString } from 'class-validator';
import { AuthenticationMethod } from '@common/enums';

export class CreateAccountDto {
  @IsEnum(AuthenticationMethod)
  provider: AuthenticationMethod;

  @IsString()
  providerAccountId: string;
}
