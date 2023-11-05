import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from './entities/region.entity';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: RegionRepository,
  ) {}

  create(createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionRepository.save(
      this.regionRepository.create(createRegionDto),
    );
  }

  findAll() {
    return this.regionRepository.find({
      relations: ['territoryList', 'provinceList', 'placeList'],
    });
  }

  findOne(fields: EntityCondition<Region>): Promise<Region> {
    return this.regionRepository.findOneOrFail({
      where: fields,
      relations: ['territoryList', 'provinceList', 'placeList'],
    });
  }

  async update(id: Region['id'], payload: DeepPartial<Region>) {
    await this.regionRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.regionRepository.softRemove({ id });
  }
}
