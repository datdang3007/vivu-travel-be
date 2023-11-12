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
import { TerritoryService } from './territory.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';

@Controller('territory')
export class TerritoryController {
  constructor(private readonly territoryService: TerritoryService) {}

  @UseGuards(AuthGuard)
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

  @Public()
  @Get('/relations/:id')
  findOneWithRelations(@Param('id') id: number) {
    return this.territoryService.findOneWithRelations({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTerritoryDto: UpdateTerritoryDto,
  ) {
    return this.territoryService.update(+id, updateTerritoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.territoryService.softRemove(+id);
  }
}
