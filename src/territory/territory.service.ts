import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { Territory } from './entities/territory.entity';
import { TerritoryRepository } from './territory.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class TerritoryService {
  constructor(
    @InjectRepository(Territory)
    private territoryRepository: TerritoryRepository,
  ) {}

  create(createTerritoryDto: CreateTerritoryDto): Promise<Territory> {
    return this.territoryRepository.save(
      this.territoryRepository.create(createTerritoryDto),
    );
  }

  findAll() {
    return this.territoryRepository.find({
      relations: ['provinceList', 'placeList'],
    });
  }

  findOne(fields: EntityCondition<Territory>): Promise<Territory> {
    console.log(fields);
    return this.territoryRepository.findOneOrFail({
      where: fields,
      relations: ['provinceList', 'placeList'],
    });
  }

  async update(id: Territory['id'], payload: DeepPartial<Territory>) {
    await this.territoryRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.territoryRepository.softRemove({ id });
  }
}
