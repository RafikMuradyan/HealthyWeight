import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeigthStatusDto } from './dtos/put-weight-status.dto';
import { IUserProfileData } from './user-profile.interfaces';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async findAll(): Promise<IUserProfileData> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const [userProfiles, count] = await userProfileQuery.getManyAndCount();

    return { userProfiles, count };
  }

  async create(userProfileData: CreateUserProfileDto): Promise<UserProfile> {
    const userProfileQuery = this.userProfileRepository.createQueryBuilder();
    const createdRow = await userProfileQuery
      .insert()
      .values(userProfileData)
      .returning('*')
      .execute();
      
    return createdRow.raw;
  }

  async putWeightStatus(
    id: number,
    weightStatusData: PutWeigthStatusDto,
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
