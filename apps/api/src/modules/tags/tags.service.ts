import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { In } from 'typeorm';
import { GetTagsFilterDto, OrderByTag } from './dto/get-tags-filter.dto';
import { UsersService } from '@modules/users/services';

@Injectable()
export class TagsService {
  constructor(private readonly usersService: UsersService) {}

  async createTag(createTagDto: CreateTagDto, userId: number): Promise<Tag> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { name, description } = createTagDto;

    const existingTag = await Tag.findOne({ where: { name } });

    if (existingTag) {
      throw new BadRequestException('Tag with this name already exists');
    }

    const tag = await Tag.create({ name, description, user }).save();

    if (!tag) {
      throw new InternalServerErrorException('Failed to create tag');
    }

    return tag;
  }

  async findOrCreateTags(names: string[], userId: number): Promise<Tag[]> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingTags = await Tag.find({ where: { name: In(names) } });
    const existingTagNames = existingTags.map(tag => tag.name);

    const newTagNames = names.filter(name => !existingTagNames.includes(name));

    const newTags = await Promise.all(newTagNames.map(name => Tag.create({ name, description: '', user }).save()));

    if (!newTags) {
      throw new InternalServerErrorException('Failed to create tags');
    }

    return [...existingTags, ...newTags];
  }

  async findTagById(id: number): Promise<Tag> {
    const tag = await Tag.createQueryBuilder('tag')
      .leftJoin('tag.user', 'user')
      .addSelect(['user.id', 'user.displayName', 'user.picture', 'user.firstName', 'user.lastName', 'tag.createdAt'])
      .where('tag.id = :id', { id })
      .getOne();

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async getTags(filter: GetTagsFilterDto) {
    const { search, orderByTag = OrderByTag.POPULAR, page = 1, limit = 10 } = filter;

    const query = Tag.createQueryBuilder('tag');

    if (search) {
      query.andWhere('tag.name ILIKE :search', { search: `%${search}%` });
    }

    switch (orderByTag) {
      case OrderByTag.NEWEST:
        query.orderBy('tag.createdAt', 'DESC');
        break;
      case OrderByTag.NAME:
        query.orderBy('tag.name', 'ASC');
        break;
      case OrderByTag.POPULAR:
        query.orderBy('tag.usageCount', 'DESC');
        break;
    }

    query.skip((page - 1) * limit);
    query.take(limit);

    const [tags, total] = await query.getManyAndCount();

    return { tags, total };
  }
}
