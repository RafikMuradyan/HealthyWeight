import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppRatings } from './app-ratings.entity';
import { CreateAppRatingDto } from './dtos/create-app-rating.dto';
import { IAppRatingsData } from './app-ratings.interfaces';

@Injectable()
export class AppRatingsService {
  constructor(
    @InjectRepository(AppRatings)
    private readonly appRatingsRepository: Repository<AppRatings>,
  ) {}

  async findAll(): Promise<IAppRatingsData> {
    try {
      const appRatingsQuery = this.appRatingsRepository.createQueryBuilder();
      const [ratings, count] = await appRatingsQuery.getManyAndCount();

      return { ratings, count };
    } catch (error) {
      throw new Error('Failed to fetch app ratings');
    }
  }

  async create(appRatingData: CreateAppRatingDto): Promise<AppRatings> {
    try {
      return this.appRatingsRepository.save(appRatingData);
    } catch (error) {
      throw new Error('Failed to create app rating');
    }
  }
}
