import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionRepository extends Repository<Region> {
  constructor(private dataSource: DataSource) {
    super(Region, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Region | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
