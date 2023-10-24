import { Controller, Get, Post, Body, ValidationPipe, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeigthStatusDto } from './dtos/put-weight-status.dto';
import { UserProfile } from './user-profile.entity';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async findAll(): Promise<UserProfile> {
    return await this.userProfileService.findAll();
  }

  @Post()
  async create(@Body(new ValidationPipe()) userProfileData: CreateUserProfileDto) {
    return  this.userProfileService.create(userProfileData);
  }

  @Put()
  async putWeightStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProfileDto: PutWeigthStatusDto
    ) {
      return this.userProfileService.putWeightStatus(id, updateUserProfileDto)
    }
}