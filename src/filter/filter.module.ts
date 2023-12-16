import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContentService } from 'src/content/content.service';
import { Content } from 'src/content/entities/content.entity';
import { Place } from 'src/place/entities/place.entity';
import { PlaceService } from 'src/place/place.service';
import { PostDetail } from 'src/post-detail/entities/post-detail.entity';
import { PostDetailService } from 'src/post-detail/post-detail.service';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { Province } from 'src/province/entities/province.entity';
import { ProvinceService } from 'src/province/province.service';
import { Region } from 'src/region/entities/region.entity';
import { RegionService } from 'src/region/region.service';
import { Territory } from 'src/territory/entities/territory.entity';
import { TerritoryService } from 'src/territory/territory.service';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Region]),
    TypeOrmModule.forFeature([Territory]),
    TypeOrmModule.forFeature([Province]),
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([Content]),
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([PostDetail]),
  ],
  controllers: [FilterController],
  providers: [
    FilterService,
    PlaceService,
    ProvinceService,
    TerritoryService,
    RegionService,
    PostService,
    ContentService,
    PostDetailService,
    ContentService,
  ],
})
export class FilterModule {}
