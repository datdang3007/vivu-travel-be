import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { UpdatePlaceImageDto } from './dto/update-place-image.dto';
import { PlaceImageService } from './place-image.service';
import { Public } from 'src/auth/auth.guard';

@Controller('place-image')
export class PlaceImageController {
  constructor(private readonly placeImageService: PlaceImageService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceImageDto) {
    return this.placeImageService.create(createPlaceDto);
  }

  @Post('/createList')
  createList(@Body() data: { data: any[] }) {
    console.log(data);
    return this.placeImageService.createList(data.data);
  }

  @Public()
  @Get()
  findAll() {
    return this.placeImageService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placeImageService.findOne({ id });
  }

  @Get('/findByPlaceID/:id')
  findByPlaceID(@Param('placeID') id: number) {
    return this.placeImageService.findByPlaceID({ place: { id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceImageDto) {
    return this.placeImageService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeImageService.softRemove(+id);
  }

  @Delete('/delete/list')
  removeList(@Body() list: number[]) {
    return this.placeImageService.removeList(list);
  }
}
