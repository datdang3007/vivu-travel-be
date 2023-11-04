import { Module } from '@nestjs/common';
import { PlaceCategoryService } from './place-category.service';
import { PlaceCategoryController } from './place-category.controller';
import { PlaceCategory } from './entities/place-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/place/entities/place.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([PlaceCategory]),
  ],
  controllers: [PlaceCategoryController],
  providers: [PlaceCategoryService],
})
export class PlaceCategoryModule {}
