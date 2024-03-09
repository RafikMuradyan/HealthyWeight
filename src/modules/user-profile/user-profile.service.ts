import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeightStatusDto } from './dtos/put-weight-status.dto';
import { IUserAnalytics, IUserProfileData } from './user-profile.interfaces';
import { CalculateIdealWeight } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.service';
import { ICalculationResult } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.interfaces';
import { getWeightStatus } from '../../utils/calculate-weight-result';
import { AgeRange } from './user-profile.enums';
import { OrNeverType } from '../../utils/types/or-never.type';
import { UserNotFoundException } from './exceptions';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    private readonly calculateWeight: CalculateIdealWeight,
  ) {}

  async findAll(): Promise<IUserProfileData> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const [userProfiles, count] = await userProfileQuery.getManyAndCount();

    return { userProfiles, count };
  }

  async create(
    userProfileData: CreateUserProfileDto,
  ): Promise<ICalculationResult> {
    const calculationResult = this.calculateWeight.calculate(userProfileData);
    const { minWeight, maxWeight } = calculationResult.BMI;

    const weightStatus = getWeightStatus({
      actualWeight: userProfileData.weight,
      minWeight,
      maxWeight,
    });

    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const userData = {
      ...userProfileData,
      weightStatus,
    };
    const createdRow = await userProfileQuery
      .insert()
      .values(userData)
      .returning('*')
      .execute();

    if (!createdRow.raw) {
      throw new BadRequestException('Failed to create the user profile');
    }

    return calculationResult;
  }

  async getAnalytics(): Promise<IUserAnalytics> {
    const baseWeightStatusQuery = this.userProfileRepository
      .createQueryBuilder('user')
      .select('user.weightStatus', 'weightStatus')
      .addSelect('CAST(COUNT(user.weightStatus) AS INTEGER)', 'count');
    const byWeightStatus = await baseWeightStatusQuery
      .groupBy('user.weightStatus')
      .getRawMany();

    const baseGenderQuery = this.userProfileRepository
      .createQueryBuilder('user')
      .select('user.gender', 'gender')
      .addSelect('CAST(COUNT(user.gender) AS INTEGER)', 'count');
    const byGender = await baseGenderQuery.groupBy('user.gender').getRawMany();

    const byAge = await this.userProfileRepository
      .createQueryBuilder('user')
      .select(
        `CASE \
        WHEN user.age <= 16 THEN '${AgeRange.To16}' \
        WHEN user.age <= 35 THEN '${AgeRange.From17To35}' \
        WHEN user.age <= 50 THEN '${AgeRange.From36To50}' \
        ELSE '${AgeRange.From50}' \
      END AS "ageRange"`,
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy('"ageRange"')
      .getRawMany();

    return {
      byGender,
      byWeightStatus,
      byAge,
    };
  }

  async putWeightStatus(
    id: number,
    weightStatusData: PutWeightStatusDto,
  ): Promise<OrNeverType<UserProfile>> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const existingProfile = await userProfileQuery
      .where('id = :id', { id })
      .getOne();

    if (!existingProfile) {
      throw new UserNotFoundException();
    }

    existingProfile.weightStatus = weightStatusData.weightStatus;
    const updatedRaw = await this.userProfileRepository.save(existingProfile);

    return updatedRaw;
  }
}
