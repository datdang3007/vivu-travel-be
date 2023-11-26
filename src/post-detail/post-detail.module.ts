import { Module } from '@nestjs/common';
import { PostDetailService } from './post-detail.service';
import { PostDetailController } from './post-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { PostDetail } from './entities/post-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([PostDetail]),
  ],
  controllers: [PostDetailController],
  providers: [PostDetailService],
})
export class PostDetailModule {}
