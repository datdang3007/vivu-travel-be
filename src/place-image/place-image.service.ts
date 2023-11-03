import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { PlaceImage } from './entities/place-image.entity';
import { PlaceImageRepository } from './place-image.repository';

@Injectable()
export class PlaceImageService {
  constructor(
    @InjectRepository(PlaceImage)
    private placeImageRepository: PlaceImageRepository,
  ) {}

  create(createPlaceImageDto: CreatePlaceImageDto): Promise<PlaceImage> {
    return this.placeImageRepository.save(
      this.placeImageRepository.create(createPlaceImageDto),
    );
  }

  async createList(list: CreatePlaceImageDto[]): Promise<boolean> {
    let isSuccess = true;

    console.log(list);

    await Promise.all(
      list.map(async (val) => {
        try {
          await this.placeImageRepository.save(
            this.placeImageRepository.create(val),
          );
        } catch (e) {
          isSuccess = false;
        }
      }),
    );

    return isSuccess;
  }

  findAll() {
    return this.placeImageRepository.find();
  }

  findOne(fields: EntityCondition<PlaceImage>): Promise<PlaceImage> {
    return this.placeImageRepository.findOneOrFail({
      where: fields,
    });
  }

  findByPlaceID(fields: EntityCondition<PlaceImage>): Promise<PlaceImage[]> {
    return this.placeImageRepository.find({
      where: fields,
    });
  }

  async update(id: PlaceImage['id'], payload: DeepPartial<PlaceImage>) {
    await this.placeImageRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.placeImageRepository.softRemove({ id });
  }

  async removeList(list: number[]) {
    let isSuccess = true;

    await Promise.all(
      list.map(async (id) => {
        try {
          await this.placeImageRepository.softRemove({ id });
        } catch (e) {
          isSuccess = false;
        }
      }),
    );

    return isSuccess;
  }
}
