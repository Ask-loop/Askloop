import { IsEnum, IsString } from 'class-validator';
import { AuthenticationMethod } from '@shared/enums';

export class CreateAccountDto {
  @IsEnum(AuthenticationMethod)
  provider: AuthenticationMethod;

  @IsString()
  providerAccountId: string;
}
