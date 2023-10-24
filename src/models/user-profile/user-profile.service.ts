import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeigthStatusDto } from './dtos/put-weight-status.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) { }

  async findAll(): Promise<any> {

    return true;
    // return this.userProfileRepository.find();
  }

  async create(userProfileData: CreateUserProfileDto): Promise<any> {

    return true;
    // const userProfile = this.userProfileRepository.create(userProfileData);
    // return await this.userProfileRepository.save(userProfile);
  }

  async putWeightStatus(
    id: number,
    weightStatusData: PutWeigthStatusDto,
  ): Promise<any> {

    return true;
    // const userProfile = this.userProfileRepository.create(userProfileData);
    // return await this.userProfileRepository.save(userProfile);
  }
}