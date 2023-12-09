import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlaceComment } from './entities/place-comment.entity';

@Injectable()
export class PlaceCommentRepository extends Repository<PlaceComment> {
  constructor(private dataSource: DataSource) {
    super(PlaceComment, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<PlaceComment | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
