import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserProfileController } from './user-profile.controller';
import { UserProfile } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { CalculateIdealWeight } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.service';
import { CreateUserProfileDto } from './dtos';
import { Gender } from './enums';
import { ICalculationResult } from 'src/utils/calculate-ideal-weight/interfaces';

describe('UserProfileController', () => {
  let controller: UserProfileController;
  let service: UserProfileService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        UserProfileService,
        CalculateIdealWeight,
        {
          provide: getRepositoryToken(UserProfile),
          useValue: {},
        },
      ],
    }).compile();

    controller = moduleRef.get<UserProfileController>(UserProfileController);
    service = moduleRef.get<UserProfileService>(UserProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCount', () => {
    it('should return count', async () => {
      const mockCount = 314;

      jest.spyOn(service, 'getCount').mockResolvedValue(mockCount);

      expect(await controller.getCount()).toBe(mockCount);
    });
  });

  describe('createUserProfile', () => {
    it('should create an user profile', async () => {
      const userProfileData: CreateUserProfileDto = {
        age: 25,
        gender: Gender.MALE,
        height: 180,
        weight: 85,
      };

      const mockValue: ICalculationResult = {
        BMI: {
          minWeight: 59.9,
          maxWeight: 81,
        },
        robinsonFormula: 72.6,
        millerFormula: 71.5,
        devineFormula: 75,
        hamwiForumla: 77.3,
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockValue);

      expect(await controller.create(userProfileData)).toBe(mockValue);
    });
  });
});
