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

  async findOrCreateTags(inputs: string[], userId: number): Promise<Tag[]> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tagsMap = new Map<number, Tag>();
    const nameMap = new Map<string, Tag>();

    for (const input of inputs) {
      let tag: Tag | null = null;

      const isId = typeof input === 'number' || /^\d+$/.test(String(input));
      const name = input.toString().toLowerCase();

      // 1. Try to find by ID if input is a number
      if (isId) {
        const id = Number(input);
        if (tagsMap.has(id)) {
          tag = tagsMap.get(id)!;
        } else {
          tag = await Tag.findOne({ where: { id } });
          if (tag) tagsMap.set(id, tag);
        }
      }

      // 2. Try to find by name if not found by ID
      if (!tag) {
        if (nameMap.has(name)) {
          tag = nameMap.get(name)!;
        } else {
          tag = await Tag.findOne({ where: { name } });
          if (tag) nameMap.set(name, tag);
        }
      }

      // 3. Create new tag if not found
      if (!tag) {
        tag = Tag.create({ name, user, description: '' });
        await tag.save();
      } else {
        tag.usageCount = (tag.usageCount || 0) + 1;
        await tag.save();
      }

      // Prevent duplicates
      if (!tagsMap.has(tag.id)) {
        tagsMap.set(tag.id, tag);
      }
    }

    return Array.from(tagsMap.values());
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
