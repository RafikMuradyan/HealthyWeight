import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import {
  CreateUserProfileDto,
  PutWeightStatusDto,
  UserProfileDto,
} from './dtos';
import { IUserAnalytics } from './interfaces';
import { ICalculationResult } from '../../utils/calculate-ideal-weight/interfaces';
import { OrNeverType } from '../../utils/types';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserProfile,
  GetAnalytics,
  GetUsersCount,
  PutWeightStatus,
} from './decorators';

@ApiTags('User Profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  @GetUsersCount()
  async getCount(): Promise<number> {
    const userProfileCount = await this.userProfileService.getCount();
    return userProfileCount;
  }

  @Post()
  @CreateUserProfile()
  async create(
    @Body() userProfileData: CreateUserProfileDto,
  ): Promise<ICalculationResult> {
    const createdUserProfile = await this.userProfileService.create(
      userProfileData,
    );
    return createdUserProfile;
  }

  @Put(':id')
  @PutWeightStatus()
  async putWeightStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProfileDto: PutWeightStatusDto,
  ): Promise<OrNeverType<UserProfileDto>> {
    const updatedUserProfile = await this.userProfileService.putWeightStatus(
      id,
      updateUserProfileDto,
    );
    return updatedUserProfile;
  }

  @Get('analytics')
  @GetAnalytics()
  async getAnalytics(): Promise<IUserAnalytics> {
    const analitycs = await this.userProfileService.getAnalytics();

    return analitycs;
  }
}
