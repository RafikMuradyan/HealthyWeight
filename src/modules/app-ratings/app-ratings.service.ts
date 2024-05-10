import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppRatings } from './app-ratings.entity';
import { AppRatingDto, CreateAppRatingDto } from './dtos';
import { IAppRatingsData } from './interfaces';

@Injectable()
export class AppRatingsService {
  constructor(
    @InjectRepository(AppRatings)
    private readonly appRatingsRepository: Repository<AppRatings>,
  ) {}

  async findAll(): Promise<IAppRatingsData> {
    const appRatingsQuery = this.appRatingsRepository.createQueryBuilder();
    const [ratings, count] = await appRatingsQuery.getManyAndCount();
    const appRatingsDtos = ratings.map((rating) => new AppRatingDto(rating));

    return { ratings: appRatingsDtos, count };
  }

  async create(appRatingData: CreateAppRatingDto): Promise<AppRatingDto> {
    const appRatingsQuery = this.appRatingsRepository.createQueryBuilder();
    const createdRow = await appRatingsQuery
      .insert()
      .values(appRatingData)
      .returning('*')
      .execute();

    const appRatingDto = new AppRatingDto(createdRow.raw);

    return appRatingDto;
  }
}
