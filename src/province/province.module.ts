import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territory } from 'src/territory/entities/territory.entity';
import { Province } from './entities/province.entity';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { Region } from 'src/region/entities/region.entity';
import { TerritoryService } from 'src/territory/territory.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Region]),
    TypeOrmModule.forFeature([Territory]),
    TypeOrmModule.forFeature([Province]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService, TerritoryService],
})
export class ProvinceModule {}
