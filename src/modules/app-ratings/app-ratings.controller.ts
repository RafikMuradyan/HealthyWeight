import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppRatingsService } from './app-ratings.service';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos/create-app-rating.dto';
import { IAppRatingsData } from './app-ratings.interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App Ratings')
@Controller('app-ratings')
export class AppRatingsController {
  constructor(private readonly appRatingsService: AppRatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rating' })
  @UsePipes(new ValidationPipe())
  async createRating(
    @Body() appRatingData: CreateAppRatingDto,
  ): Promise<AppRatings> {
    const createdRatig = this.appRatingsService.create(appRatingData);
    return createdRatig;
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  async findAll(): Promise<IAppRatingsData> {
    const appRatingsData = this.appRatingsService.findAll();
    return appRatingsData;
  }
}
