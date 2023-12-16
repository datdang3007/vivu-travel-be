import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { DatabaseModule } from './database/database.module';
// import { DatabaseModuleDev } from './database/database_dev.module';
import { PlaceCategoryModule } from './place-category/place-category.module';
import { PlaceImageModule } from './place-image/place-image.module';
import { PlaceModule } from './place/place.module';
import { ProvinceModule } from './province/province.module';
import { RegionModule } from './region/region.module';
import { TerritoryModule } from './territory/territory.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PostModule } from './post/post.module';
import { PostDetailModule } from './post-detail/post-detail.module';
import { PlaceCommentModule } from './place-comment/place-comment.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    FilterModule,
    RegionModule,
    TerritoryModule,
    ProvinceModule,
    PlaceModule,
    ContentModule,
    PlaceImageModule,
    PlaceCategoryModule,
    UserModule,
    AuthModule,
    RoleModule,
    PostModule,
    PostDetailModule,
    PlaceCommentModule,
  ],
})
export class AppModule {}
