import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
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
