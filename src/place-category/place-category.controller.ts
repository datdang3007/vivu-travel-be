import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlaceCategoryDto } from './dto/create-place-category.dto';
import { PlaceCategoryService } from './place-category.service';
import { Public } from 'src/auth/auth.guard';

@Controller('place-category')
export class PlaceCategoryController {
  constructor(private readonly placeCategoryService: PlaceCategoryService) {}

  @Public()
  @Get()
  findAll() {
    return this.placeCategoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placeCategoryService.findOne({ id });
  }

  @Post('/bulkUpdate')
  bulkUpdate(@Body() bulk: { data: CreatePlaceCategoryDto[] }) {
    return this.placeCategoryService.bulkUpdate(bulk);
  }
}
