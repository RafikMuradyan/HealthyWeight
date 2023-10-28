import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeightStatusDto } from './dtos/put-weight-status.dto';
import { UserProfile } from './user-profile.entity';
import { IUserProfileData } from './user-profile.interfaces';
import { ICalculationResult } from 'src/utils/calculate-ideal-weight/calculate.ideal-weight.interfaces';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async findAll(): Promise<IUserProfileData> {
    const userProfileData = this.userProfileService.findAll();
    return userProfileData;
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) userProfileData: CreateUserProfileDto,
  ): Promise<ICalculationResult> {
    const createdUserProfile = this.userProfileService.create(userProfileData);
    return createdUserProfile;
  }

  @Put(':id')
  async putWeightStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProfileDto: PutWeightStatusDto,
  ): Promise<UserProfile> {
    const updatedUserProfile = this.userProfileService.putWeightStatus(
      id,
      updateUserProfileDto,
    );
    return updatedUserProfile;
  }
}
