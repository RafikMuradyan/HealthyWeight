import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeightStatusDto } from './dtos/put-weight-status.dto';
import { IUserAnalytics, IUserProfileData } from './user-profile.interfaces';
import { CalculateIdealWeight } from 'src/utils/calculate-ideal-weight/calculate-ideal-weight.service';
import { ICalculationResult } from 'src/utils/calculate-ideal-weight/calculate-ideal-weight.interfaces';
import { getWeightStatus } from 'src/utils/calculate-weight-result';

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

  async getAnalytics(): Promise<any> {
    const baseQuery = this.userProfileRepository
    .createQueryBuilder('user')
    .select('user.weightStatus', 'weightStatus')
    .addSelect('CAST(COUNT(user.weightStatus) AS INTEGER)', 'count')

    const byWeightStatus = await baseQuery
    .groupBy('user.weightStatus')
    .getRawMany();

    const byGender = await baseQuery
    .groupBy('user.gender')
    .getRawMany();

    const byAge = await this.userProfileRepository
    .createQueryBuilder('user')
    .select('CASE WHEN user.age <= 18 THEN 1 WHEN user.age <= 21 THEN 2 WHEN user.age <= 40 THEN 3 ELSE 4 END', 'ageRange')
    .addSelect('COUNT(*)', 'count')
    .groupBy('ageRange')
    .getRawMany();

    return {
      byAge,
      byGender,
      byWeightStatus,
    };
  }
  
  // async getAnalytics(): Promise<IUserAnalytics[]> {
  //   const result = await this.userProfileRepository
  //   .createQueryBuilder('user')
  //   .select('user.weightStatus', 'weightStatus')
  //   .addSelect('CAST(COUNT(user.weightStatus) AS INTEGER)', 'count')
  //   .groupBy('user.weightStatus')
  //   .getRawMany();

  //   return result;
  // }

  async putWeightStatus(
    id: number,
    weightStatusData: PutWeightStatusDto,
  ): Promise<UserProfile> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const existingProfile = await userProfileQuery
      .where('id = :id', { id })
      .getOne();

    if (!existingProfile) {
      throw new NotFoundException('User profile does not exist');
    }

    existingProfile.weightStatus = weightStatusData.weightStatus;
    const updatedRaw = await this.userProfileRepository.save(existingProfile);

    return updatedRaw;
  }
}
