import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostDetail } from './entities/post-detail.entity';

@Injectable()
export class PostDetailRepository extends Repository<PostDetail> {
  constructor(private dataSource: DataSource) {
    super(PostDetail, dataSource.createEntityManager());
  }
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<PostDetail | null> {
    return await this.createQueryBuilder()
      .where(`Team.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
