import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlaceImage } from './entities/place-image.entity';

@Injectable()
export class PlaceImageRepository extends Repository<PlaceImage> {
  constructor(private dataSource: DataSource) {
    super(PlaceImage, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<PlaceImage | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
