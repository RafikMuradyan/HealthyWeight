import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos/create-app-rating.dto';

@Injectable()
export class AppRatingsService {
  constructor(
    @InjectRepository(AppRatings)
    private readonly appRatingsRepository: Repository<AppRatings>,
  ) { }
  
  async findAll(): Promise<any> {
    return this.appRatingsRepository.find();
  }

  async create(appRatingData: CreateAppRatingDto): Promise<any> {
    console.log(appRatingData);
    return true;
  }
}