import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { CreatePostDetailDto } from './dto/create-post-detail.dto';
import { PostDetail } from './entities/post-detail.entity';
import { PostDetailRepository } from './post-detail.repository';

@Injectable()
export class PostDetailService {
  constructor(
    @InjectRepository(PostDetail)
    private postDetailRepository: PostDetailRepository,
  ) {}

  create(createPostDetailDto: CreatePostDetailDto): Promise<PostDetail> {
    return this.postDetailRepository.save(
      this.postDetailRepository.create(createPostDetailDto),
    );
  }

  findAll() {
    return this.postDetailRepository.find({
      order: { id: 'DESC' },
    });
  }

  findOne(fields: EntityCondition<PostDetail>): Promise<PostDetail> {
    return this.postDetailRepository.findOneOrFail({
      where: fields,
      order: { id: 'DESC' },
    });
  }

  async update(id: PostDetail['id'], payload: DeepPartial<PostDetail>) {
    await this.postDetailRepository.update({ id }, payload);
  }

  async delete(id: number) {
    await this.postDetailRepository.delete({ post: { id } });
  }

  async softRemove(id: number) {
    await this.postDetailRepository.softRemove({ id });
  }
}
