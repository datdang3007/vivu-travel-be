import { Module } from '@nestjs/common';
import { PlaceCategoryService } from './place-category.service';
import { PlaceCategoryController } from './place-category.controller';
import { PlaceCategory } from './entities/place-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/place/entities/place.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([PlaceCategory]),
  ],
  controllers: [PlaceCategoryController],
  providers: [PlaceCategoryService],
})
export class PlaceCategoryModule {}
