import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
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
    });
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
