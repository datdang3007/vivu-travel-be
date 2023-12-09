import { Module } from '@nestjs/common';
import { PlaceCommentService } from './place-comment.service';
import { PlaceCommentController } from './place-comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PlaceComment } from './entities/place-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PlaceComment])],
  controllers: [PlaceCommentController],
  providers: [PlaceCommentService],
})
export class PlaceCommentModule {}
