import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppRatingsService } from './app-ratings.service';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos/create-app-rating.dto';

@Controller('app-ratings')
export class AppRatingsController {
  constructor(private readonly appRatingsService: AppRatingsService) {}

  @Post()
  async createRating(@Body(new ValidationPipe()) appRatingData: CreateAppRatingDto): Promise<any> {
    return this.appRatingsService.create(appRatingData);
  }

  @Get()
  async findAll(): Promise<AppRatings[]> {
    return this.appRatingsService.findAll();
  }
}