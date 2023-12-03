import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial, In } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';
import { PlaceRepository } from './place.repository';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: PlaceRepository,
    private provinceService: ProvinceService,
    private contentService: ContentService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const { contents, ...dataCreate } = createPlaceDto;

    const provinceId = Number(dataCreate.province);

    const province = await this.provinceService.findOne({
      id: provinceId,
    });

    const place = await this.placeRepository.save(
      this.placeRepository.create({
        ...dataCreate,
        region: province.region,
        territory: province.territory,
      }),
    );

    this.contentService.delete(place.id);

    contents.forEach((val) => {
      const { type, content } = val;
      this.contentService.create({
        type,
        content,
        place,
      });
    });

    return place;
  }

  findAll() {
    return this.placeRepository.find({
      relations: ['image_stock'],
    });
  }

  findOne(fields: EntityCondition<Place>): Promise<Place> {
    return this.placeRepository.findOneOrFail({
      where: fields,
    });
  }

  findOneWithRelations(fields: EntityCondition<Place>): Promise<Place> {
    return this.placeRepository.findOneOrFail({
      where: fields,
      relations: ['contents', 'category'],
      order: { contents: { id: 'ASC' } },
    });
  }

  findByListId(ids: string): Promise<Place[]> {
    const listId = ids.split(',');
    return this.placeRepository.find({
      where: { id: In(listId) },
      relations: ['contents', 'category', 'image_stock'],
      order: { contents: { id: 'ASC' }, image_stock: { id: 'ASC' } },
    });
  }

  async filterPlacesByCriteria(criteria: any): Promise<Place[]> {
    const queryBuilder = this.placeRepository.createQueryBuilder('place');

    if (criteria.placeId) {
      queryBuilder.andWhere('place.id != :placeId', {
        placeId: criteria.placeId,
      });
    }

    if (criteria.regionId) {
      queryBuilder.andWhere('place.region.id = :regionId', {
        regionId: criteria.regionId,
      });
    }

    if (criteria.territoryId) {
      queryBuilder.andWhere('place.territory.id = :territoryId', {
        territoryId: criteria.territoryId,
      });
    }

    if (criteria.provinceId) {
      queryBuilder.andWhere('place.province.id = :provinceId', {
        provinceId: criteria.provinceId,
      });
    }

    if (criteria.categoryIds) {
      queryBuilder.innerJoin('place.category', 'category');
      queryBuilder.andWhere('category.id IN (:...categoryIds)', {
        categoryIds: criteria.categoryIds,
      });
    }

    const filteredPlaces = await queryBuilder.getMany();
    return filteredPlaces;
  }

  findOneInTerritory(territoryID: number): Promise<Place> {
    return this.placeRepository.findOneOrFail({
      where: { territory: { id: territoryID } },
    });
  }

  async update(id: Place['id'], payload: DeepPartial<Place>) {
    await this.placeRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.placeRepository.softRemove({ id });
  }
}
