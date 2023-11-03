import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Place } from 'src/place/entities/place.entity';
import { Content } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
