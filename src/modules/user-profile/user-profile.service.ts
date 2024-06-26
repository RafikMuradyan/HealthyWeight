import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto, PutWeightStatusDto } from './dtos';
import { IUserAnalytics } from './interfaces';
import { CalculateIdealWeight } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.service';
import { ICalculationResult } from '../../utils/calculate-ideal-weight/interfaces';
import { AgeRange } from './enums';
import { OrNeverType } from '../../utils/types';
import { UserProfileNotFoundException } from './exceptions';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    private readonly calculateWeight: CalculateIdealWeight,
  ) {}

  async getCount(): Promise<number> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const count = await userProfileQuery.getCount();

    return count;
  }

  async create(
    userProfileData: CreateUserProfileDto,
  ): Promise<ICalculationResult> {
    const calculationResult = this.calculateWeight.calculate(userProfileData);
    const { minWeight, maxWeight } = calculationResult.BMI;

    const weightStatus = this.calculateWeight.getWeightStatus({
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
      throw new UserProfileNotFoundException();
    }
    this.userProfileRepository.merge(existingProfile, weightStatusData);
    const updatedRaw = await this.userProfileRepository.save(existingProfile);

    return updatedRaw;
  }
}
