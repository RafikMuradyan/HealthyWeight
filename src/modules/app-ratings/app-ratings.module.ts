import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRatings } from './app-ratings.entity';
import { AppRatingsService } from './app-ratings.service';
import { AppRatingsController } from './app-ratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppRatings])],
  providers: [AppRatingsService],
  controllers: [AppRatingsController],
})

export class AppRatingsModule {};