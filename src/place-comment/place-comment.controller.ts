import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePlaceCommentDto } from './dto/create-place-comment.dto';
import { PlaceCommentService } from './place-comment.service';
import { AuthGuard, Public } from 'src/auth/auth.guard';

@Controller('place-comment')
export class PlaceCommentController {
  constructor(private readonly placeCommentService: PlaceCommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPlaceCommentDto: CreatePlaceCommentDto) {
    return this.placeCommentService.create(createPlaceCommentDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.placeCommentService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placeCommentService.findOne({ id });
  }

  @Public()
  @Get('/findByPlace/:id')
  findByPlaceId(@Param('id') id: number) {
    return this.placeCommentService.findByPlaceId(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeCommentService.softRemove(+id);
  }
}
