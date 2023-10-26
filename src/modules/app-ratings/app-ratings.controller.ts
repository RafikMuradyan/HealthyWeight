import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppRatingsService } from './app-ratings.service';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos/create-app-rating.dto';
import { IAppRatingsData } from './app-ratings.interfaces';

@Controller('app-ratings')
export class AppRatingsController {
  constructor(private readonly appRatingsService: AppRatingsService) {}

  @Post()
  async createRating(
    @Body(new ValidationPipe()) appRatingData: CreateAppRatingDto,
  ): Promise<AppRatings> {
    const createdRatig = this.appRatingsService.create(appRatingData);
    return createdRatig;
  }

  @Get()
  async findAll(): Promise<IAppRatingsData> {
    const appRatingsData = this.appRatingsService.findAll();
    return appRatingsData;
  }
}
