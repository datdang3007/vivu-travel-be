import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/region/entities/region.entity';
import { Territory } from './entities/territory.entity';
import { TerritoryController } from './territory.controller';
import { TerritoryService } from './territory.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Region]),
    TypeOrmModule.forFeature([Territory]),
  ],
  controllers: [TerritoryController],
  providers: [TerritoryService],
})
export class TerritoryModule {}
