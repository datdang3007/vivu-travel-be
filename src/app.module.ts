import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import { DatabaseModuleDev } from './database/database_dev.module';
import { TerritoryModule } from './territory/territory.module';
import { RegionModule } from './region/region.module';
import { ProvinceModule } from './province/province.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModuleDev,
    RegionModule,
    TerritoryModule,
    ProvinceModule,
    PlaceModule,
  ],
})
export class AppModule {}
