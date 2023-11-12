import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ContentService } from 'src/content/content.service';
import { AuthGuard, Public } from 'src/auth/auth.guard';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly contentService: ContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placeService.findOneWithRelations({ id });
  }

  @Public()
  @Get('/relations/:id')
  findOneWithRelations(@Param('id') id: number) {
    return this.placeService.findOneWithRelations({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(+id, updatePlaceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.softRemove(+id);
  }
}
