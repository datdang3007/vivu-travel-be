import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Territory } from './entities/territory.entity';

@Injectable()
export class TerritoryRepository extends Repository<Territory> {
  constructor(private dataSource: DataSource) {
    super(Territory, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Territory | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
