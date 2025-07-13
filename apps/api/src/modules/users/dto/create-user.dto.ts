import { AuthenticationMethod } from '@shared/enums';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Account } from '@modules/accounts/account.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(AuthenticationMethod)
  provider: AuthenticationMethod;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  verificationToken?: string;

  @IsArray()
  @IsOptional()
  accounts?: Account[];
}
