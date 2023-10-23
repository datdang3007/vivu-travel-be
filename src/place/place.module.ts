import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from 'src/province/entities/province.entity';
import { Place } from './entities/place.entity';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Province]),
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
