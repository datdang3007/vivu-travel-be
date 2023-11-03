import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: ContentRepository,
  ) {}

  create(createContentDto: CreateContentDto): Promise<Content> {
    console.log(createContentDto);

    return this.contentRepository.save(
      this.contentRepository.create(createContentDto),
    );
  }

  findAll() {
    return this.contentRepository.find();
  }

  findOne(fields: EntityCondition<Content>): Promise<Content> {
    return this.contentRepository.findOneOrFail({
      where: fields,
    });
  }

  async update(id: Content['id'], payload: DeepPartial<Content>) {
    await this.contentRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.contentRepository.softRemove({ id });
  }
}
