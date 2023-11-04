import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreatePlaceCategoryDto } from './dto/create-place-category.dto';
import { PlaceCategory } from './entities/place-category.entity';
import { PlaceCategoryRepository } from './place-category.repository';

@Injectable()
export class PlaceCategoryService {
  constructor(
    @InjectRepository(PlaceCategory)
    private placeCategoryRepository: PlaceCategoryRepository,
  ) {}

  findAll() {
    return this.placeCategoryRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(fields: EntityCondition<PlaceCategory>): Promise<PlaceCategory> {
    return this.placeCategoryRepository.findOneOrFail({
      where: fields,
    });
  }

  async softRemove(id: number) {
    await this.placeCategoryRepository.softRemove({ id });
  }

  async bulkUpdate(bulk: { data: CreatePlaceCategoryDto[] }) {
    const promises = bulk.data.map(async (val) => {
      if (typeof val.id === 'string') {
        return this.placeCategoryRepository.save(
          this.placeCategoryRepository.create({ name: val.name }),
        );
      }
      if (typeof val.id === 'number' && !val.delete) {
        const existingData = await this.placeCategoryRepository.findOneOrFail({
          where: { id: val.id },
        });
        const newData = { ...existingData, name: val.name };
        return this.placeCategoryRepository.update({ id: val.id }, newData);
      }
      if (typeof val.id === 'number' && val.delete) {
        return this.placeCategoryRepository.softRemove({ id: val.id });
      }
    });

    await Promise.all(promises);
  }
}
