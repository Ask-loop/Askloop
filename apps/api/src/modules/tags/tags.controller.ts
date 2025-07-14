import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { GetTagsFilterDto } from './dto/get-tags-filter.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { Request } from 'express';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getTags(@Query() filter: GetTagsFilterDto) {
    return this.tagsService.getTags(filter);
  }

  @Get(':id')
  async getTagById(@Param('id') id: string) {
    return this.tagsService.findTagById(Number(id));
  }

  @Post()
  @ApiCreatedResponse({ type: Tag })
  @UseGuards(AuthGuard)
  async createTag(@Req() req: Request, @Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto, req?.user?.id);
  }
}
