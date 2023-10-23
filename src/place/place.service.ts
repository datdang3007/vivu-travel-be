import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { PlaceRepository } from './place.repository';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: PlaceRepository,
  ) {}

  create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeRepository.save(
      this.placeRepository.create(createPlaceDto),
    );
  }

  findAll() {
    return this.placeRepository.find();
  }

  findOne(fields: EntityCondition<Place>): Promise<Place> {
    return this.placeRepository.findOneOrFail({
      where: fields,
    });
  }

  async update(id: Place['id'], payload: DeepPartial<Place>) {
    await this.placeRepository.update({ id }, payload);
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
