import { TestingModule, Test } from '@nestjs/testing';
import { AppRatingsController } from './app-ratings.controller';
import { AppRatings } from './app-ratings.entity';
import { AppRatingsService } from './app-ratings.service';
import { CreateAppRatingDto } from './dtos';
import { IAppRatingsData } from './interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppRatingsController (e2e)', () => {
  let controller: AppRatingsController;
  let service: AppRatingsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppRatingsController],
      providers: [
        AppRatingsService,
        {
          provide: getRepositoryToken(AppRatings),
          useValue: {},
        },
      ],
    }).compile();

    controller = moduleRef.get<AppRatingsController>(AppRatingsController);
    service = moduleRef.get<AppRatingsService>(AppRatingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRating', () => {
    it('should create a new rating', async () => {
      const ratingData: CreateAppRatingDto = { rating: 5 };
      const createdRating: AppRatings = {
        id: 1,
        rating: ratingData.rating,
        createdAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdRating);

      expect(await controller.createRating(ratingData)).toBe(createdRating);
    });
  });

  describe('findAll', () => {
    it('should get all ratings', async () => {
      const ratingsData: IAppRatingsData = {
        count: 2,
        ratings: [
          {
            id: 1,
            rating: 5,
            createdAt: new Date(),
          },
          {
            id: 2,
            rating: 4,
            createdAt: new Date(),
          },
        ],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(ratingsData);

      expect(await controller.findAll()).toBe(ratingsData);
    });
  });
});
