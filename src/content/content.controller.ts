import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createPlaceDto: CreateContentDto) {
    return this.contentService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdateContentDto) {
    return this.contentService.update(+id, updatePlaceDto);
  }

  @Delete('deleteByPlaceId/:id')
  delete(@Param('id') id: string) {
    return this.contentService.delete(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.softRemove(+id);
  }
}
