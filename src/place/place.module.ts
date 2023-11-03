import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from 'src/province/entities/province.entity';
import { Place } from './entities/place.entity';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { Content } from 'src/content/entities/content.entity';
import { ContentService } from 'src/content/content.service';
import { Territory } from 'src/territory/entities/territory.entity';
import { Region } from 'src/region/entities/region.entity';
import { ProvinceService } from 'src/province/province.service';
import { TerritoryService } from 'src/territory/territory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region]),
    TypeOrmModule.forFeature([Territory]),
    TypeOrmModule.forFeature([Province]),
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, ProvinceService, TerritoryService, ContentService],
})
export class PlaceModule {}
