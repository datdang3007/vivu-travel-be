import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvinceRepository extends Repository<Province> {
  constructor(private dataSource: DataSource) {
    super(Province, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Province | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
