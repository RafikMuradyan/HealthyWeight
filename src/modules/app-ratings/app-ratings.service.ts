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
    const appRatingsQuery = this.appRatingsRepository.createQueryBuilder();
    const [ratings, count] = await appRatingsQuery.getManyAndCount();

    return { ratings, count };
  }

  async create(appRatingData: CreateAppRatingDto): Promise<AppRatings> {
    const appRatingsQuery = this.appRatingsRepository.createQueryBuilder();
    const createdRow = await appRatingsQuery
      .insert()
      .values(appRatingData)
      .returning('*')
      .execute();

    return createdRow.raw;
  }
}
