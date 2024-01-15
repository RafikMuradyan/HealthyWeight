import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppRatingsModule } from './modules/app-ratings/app-ratings.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { typeOrmConfigAsync } from '../db/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AppRatingsModule,
    UserProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
