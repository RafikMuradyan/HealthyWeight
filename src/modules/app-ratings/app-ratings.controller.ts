import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppRatingsService } from './app-ratings.service';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAppRatingsData } from './interfaces';

@ApiTags('App Ratings')
@Controller('app-ratings')
export class AppRatingsController {
  constructor(private readonly appRatingsService: AppRatingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new rating' })
  async createRating(
    @Body() appRatingData: CreateAppRatingDto,
  ): Promise<AppRatings> {
    const createdRatig = await this.appRatingsService.create(appRatingData);
    return createdRatig;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all ratings' })
  async findAll(): Promise<IAppRatingsData> {
    const appRatingsData = await this.appRatingsService.findAll();
    return appRatingsData;
  }
}
