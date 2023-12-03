import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Public()
  @Get('/findByStatus/:status')
  findByStatus(@Param('status') status: string) {
    return this.postService.findByStatus(status);
  }

  @Public()
  @Get('/findByUser')
  @ApiQuery({ name: 'user_id', required: true })
  @ApiQuery({ name: 'status', required: true })
  findByUser(
    @Query('user_id') user_id: number,
    @Query('status') status: string,
  ) {
    return this.postService.findByUser(user_id, status);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne({ id });
  }

  @Public()
  @Get('/relations/:id')
  findOneWithRelations(@Param('id') id: number) {
    return this.postService.findOneWithRelations({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.softRemove(+id);
  }
}
