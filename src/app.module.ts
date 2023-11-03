import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
// import { DatabaseModuleDev } from './database/database_dev.module';
import { TerritoryModule } from './territory/territory.module';
import { RegionModule } from './region/region.module';
import { ProvinceModule } from './province/province.module';
import { PlaceModule } from './place/place.module';
import { ContentModule } from './content/content.module';
import { PlaceImageModule } from './place-image/place-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    RegionModule,
    TerritoryModule,
    ProvinceModule,
    PlaceModule,
    ContentModule,
    PlaceImageModule,
  ],
})
export class AppModule {}
