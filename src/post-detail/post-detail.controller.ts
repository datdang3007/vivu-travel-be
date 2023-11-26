import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostDetailService } from './post-detail.service';
import { CreatePostDetailDto } from './dto/create-post-detail.dto';
import { UpdatePostDetailDto } from './dto/update-post-detail.dto';

@Controller('post-detail')
export class PostDetailController {
  constructor(private readonly postDetailService: PostDetailService) {}

  @Post()
  create(@Body() createPostDetailDto: CreatePostDetailDto) {
    return this.postDetailService.create(createPostDetailDto);
  }

  @Get()
  findAll() {
    return this.postDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postDetailService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDetailDto: UpdatePostDetailDto,
  ) {
    return this.postDetailService.update(+id, updatePostDetailDto);
  }

  @Delete('deleteByPostId/:id')
  delete(@Param('id') id: string) {
    return this.postDetailService.delete(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postDetailService.softRemove(+id);
  }
}
