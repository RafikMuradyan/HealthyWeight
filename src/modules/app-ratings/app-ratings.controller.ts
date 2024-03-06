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
    try {
      const createdRating = await this.appRatingsService.create(appRatingData);
      return createdRating;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  async findAll(): Promise<IAppRatingsData> {
    try {
      const appRatingsData = await this.appRatingsService.findAll();
      return appRatingsData;
    } catch (error) {
      throw error;
    }
  }
}
