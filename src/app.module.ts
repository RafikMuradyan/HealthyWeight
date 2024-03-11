import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppRatingsModule } from './modules/app-ratings/app-ratings.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { dataSourceOptions } from '../database/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AppRatingsModule,
    UserProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
