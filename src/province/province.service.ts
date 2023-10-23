import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerritoryService } from 'src/territory/territory.service';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { Province } from './entities/province.entity';
import { ProvinceRepository } from './province.repository';

@Injectable()
export class ProvinceService {
  constructor(
    private territoryService: TerritoryService,

    @InjectRepository(Province)
    private provinceRepository: ProvinceRepository,
  ) {}

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const dataCreate = { ...createProvinceDto };
    const territoryId = Number(dataCreate.territory);

    const territory = await this.territoryService.findOne({
      id: territoryId,
    });

    return this.provinceRepository.save(
      this.provinceRepository.create({
        ...dataCreate,
        region: territory.region,
      }),
    );
  }

  findAll() {
    return this.provinceRepository.find();
  }

  findOne(fields: EntityCondition<Province>): Promise<Province> {
    return this.provinceRepository.findOneOrFail({
      where: fields,
    });
  }

  async update(id: Province['id'], payload: DeepPartial<Province>) {
    await this.provinceRepository.update({ id }, payload);
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
