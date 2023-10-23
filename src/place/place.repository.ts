import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(private dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<Place | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
