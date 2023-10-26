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
import { PutWeigthStatusDto } from './dtos/put-weight-status.dto';
import { UserProfile } from './user-profile.entity';
import { IUserProfileData } from './user-profile.interfaces';

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
  ): Promise<UserProfile> {
    const createdUserProfile = this.userProfileService.create(userProfileData);
    return createdUserProfile;
  }

  @Put()
  async putWeightStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProfileDto: PutWeigthStatusDto,
  ): Promise<UserProfile> {
    const updatedUserProfile = this.userProfileService.putWeightStatus(
      id,
      updateUserProfileDto,
    );
    return updatedUserProfile;
  }
}
