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
    return this.regionRepository.find();
  }

  findOne(fields: EntityCondition<Region>): Promise<Region> {
    return this.regionRepository.findOneOrFail({
      where: fields,
    });
  }

  async update(id: Region['id'], payload: DeepPartial<Region>) {
    await this.regionRepository.update({ id }, payload);
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
