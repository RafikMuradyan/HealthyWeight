import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppRatingsService } from './app-ratings.service';
import { AppRatingDto, CreateAppRatingDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { IAppRatingsData } from './interfaces';
import { CreateAppRating, FindAllAppRating } from './decorators';

@ApiTags('App Ratings')
@Controller('app-ratings')
export class AppRatingsController {
  constructor(private readonly appRatingsService: AppRatingsService) {}

  @Post()
  @CreateAppRating()
  async createRating(
    @Body() appRatingData: CreateAppRatingDto,
  ): Promise<AppRatingDto> {
    const createdRatig = await this.appRatingsService.create(appRatingData);
    return createdRatig;
  }

  @Get()
  @FindAllAppRating()
  async findAll(): Promise<IAppRatingsData> {
    const appRatingsData = await this.appRatingsService.findAll();
    return appRatingsData;
  }
}
