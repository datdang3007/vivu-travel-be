import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlaceCategory } from './entities/place-category.entity';

@Injectable()
export class PlaceCategoryRepository extends Repository<PlaceCategory> {
  constructor(private dataSource: DataSource) {
    super(PlaceCategory, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<PlaceCategory | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
