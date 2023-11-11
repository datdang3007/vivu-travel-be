import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TerritoryService } from './territory.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('territory')
export class TerritoryController {
  constructor(private readonly territoryService: TerritoryService) {}

  @Post()
  create(@Body() createTerritoryDto: CreateTerritoryDto) {
    return this.territoryService.create(createTerritoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.territoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.territoryService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTerritoryDto: UpdateTerritoryDto,
  ) {
    return this.territoryService.update(+id, updateTerritoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.territoryService.softRemove(+id);
  }
}
