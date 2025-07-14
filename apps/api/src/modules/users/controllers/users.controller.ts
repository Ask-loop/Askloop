import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, Req, UseGuards } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { ActivitiesService, UsersService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { GetUsersFilterDto } from '../dto/get-users-filter.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersStatsService } from '../services/users-stats.service';
import { GetActivitiesFilterDto } from '../dto/get-activities-filter.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersStatsService: UsersStatsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  @Get()
  async getUsers(@Query() filter: GetUsersFilterDto) {
    return this.usersService.getUsers(filter);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request): Promise<User | null> {
    return this.usersService.getUser(req.user?.id);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Get(':id/stats')
  async getUserStats(@Param('id', ParseIntPipe) id: number) {
    return this.usersStatsService.getStats(Number(id));
  }

  @Get('me/stats')
  @UseGuards(AuthGuard)
  async getMeStats(@Req() req: Request) {
    return this.usersStatsService.getStats(req.user?.id);
  }

  @Put('me')
  @UseGuards(AuthGuard)
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user?.id, updateUserDto);
  }

  @Get(':id/activity')
  async getUserActivity(@Param('id', ParseIntPipe) id: number, @Query() query: GetActivitiesFilterDto) {
    return this.activitiesService.getUserActivities(id, query);
  }

  @Get('me/activity')
  @UseGuards(AuthGuard)
  async getMeActivity(@Req() req: Request, @Query() query: GetActivitiesFilterDto) {
    return this.activitiesService.getUserActivities(req.user?.id, query);
  }
}
