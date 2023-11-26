import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PostStatus } from 'src/constants/post_status.enum';
import { PostDetailService } from 'src/post-detail/post-detail.service';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: PostRepository,
    private postDetailService: PostDetailService,
    private authService: AuthService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { contents, creator, ...dataCreate } = createPostDto;

    const user = await this.authService.findUserByEmail(creator);

    const post = await this.postRepository.save(
      this.postRepository.create({
        status: PostStatus.New,
        creator: user,
        ...dataCreate,
      }),
    );

    this.postDetailService.delete(post.id);

    contents.forEach((val) => {
      const { type, content } = val;
      this.postDetailService.create({
        type,
        content,
        post,
      });
    });

    return post;
  }

  findAll() {
    return this.postRepository.find({
      relations: ['contents'],
    });
  }

  findByStatus(status: number) {
    return this.postRepository.find({
      where: { status: status },
      relations: ['contents'],
    });
  }

  findOne(fields: EntityCondition<Post>): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: fields,
    });
  }

  findOneWithRelations(fields: EntityCondition<Post>): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: fields,
      relations: ['creator', 'contents'],
    });
  }

  async update(id: Post['id'], updatePostDto: UpdatePostDto) {
    const { censor, status } = updatePostDto;
    const user = await this.authService.findUserByEmail(censor);
    await this.postRepository.update({ id }, { censor: user, status });
  }

  async softRemove(id: number) {
    await this.postRepository.softRemove({ id });
  }
}
