import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { FindManyOptions } from 'typeorm';

@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findMany(@Query() query: FindManyOptions<User>): Promise<User[]> {
    return this.usersService.findMany(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request): Promise<User | null> {
    return this.usersService.findById(req.user?.id);
  }
}
