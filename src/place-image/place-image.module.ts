import { Module } from '@nestjs/common';
import { PlaceImageService } from './place-image.service';
import { PlaceImageController } from './place-image.controller';
import { Place } from 'src/place/entities/place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceImage } from './entities/place-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([PlaceImage]),
  ],
  controllers: [PlaceImageController],
  providers: [PlaceImageService],
})
export class PlaceImageModule {}
