import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      // useFactory: async (configService: ConfigService) => {
      useFactory: async () => {
        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          // host: configService.get('DB_HOST'),
          // port: configService.get('DB_PORT'),
          // username: configService.get('DB_USERNAME'),
          // password: configService.get('DB_PASSWORD'),
          // database: configService.get('DB_DATABASE'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations',
          },
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
