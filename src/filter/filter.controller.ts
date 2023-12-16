import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Public()
  @Get()
  findAll(@Query('search') search: string) {
    return this.filterService.findAll(search);
  }
}
