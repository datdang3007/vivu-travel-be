import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlaceCategoryDto } from './dto/create-place-category.dto';
import { PlaceCategoryService } from './place-category.service';

@Controller('place-category')
export class PlaceCategoryController {
  constructor(private readonly placeCategoryService: PlaceCategoryService) {}

  @Get()
  findAll() {
    return this.placeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placeCategoryService.findOne({ id });
  }

  @Post('/bulkUpdate')
  bulkUpdate(@Body() bulk: { data: CreatePlaceCategoryDto[] }) {
    return this.placeCategoryService.bulkUpdate(bulk);
  }
}
