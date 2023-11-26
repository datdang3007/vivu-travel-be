import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostDetail } from 'src/post-detail/entities/post-detail.entity';
import { PostDetailService } from 'src/post-detail/post-detail.service';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([PostDetail]),
  ],
  controllers: [PostController],
  providers: [PostService, PostDetailService],
})
export class PostModule {}
