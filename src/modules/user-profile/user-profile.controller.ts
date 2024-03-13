import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Put,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { PutWeightStatusDto } from './dtos/put-weight-status.dto';
import { UserProfile } from './user-profile.entity';
import { IUserAnalytics } from './user-profile.interfaces';
import { ICalculationResult } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.interfaces';
import { OrNeverType } from '../../utils/types/or-never.type';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User Profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiOperation({ summary: 'Get count of all user profiles' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getCount(): Promise<number> {
    const userProfileCount = await this.userProfileService.getCount();
    return userProfileCount;
  }

  
  @ApiOperation({ summary: 'Create new user profile' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() userProfileData: CreateUserProfileDto,
  ): Promise<ICalculationResult> {
    const createdUserProfile = await this.userProfileService.create(
      userProfileData,
    );
    return createdUserProfile;
  }

  @ApiOperation({ summary: 'Put weight status in user profile' })
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe())
  async putWeightStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProfileDto: PutWeightStatusDto,
  ): Promise<OrNeverType<UserProfile>> {
    const updatedUserProfile = await this.userProfileService.putWeightStatus(
      id,
      updateUserProfileDto,
    );
    return updatedUserProfile;
  }

  @ApiOperation({ summary: 'Get user profile analitycs' })
  @Get('analytics')
  @HttpCode(HttpStatus.OK)
  async getAnalytics(): Promise<IUserAnalytics> {
    const analitycs = await this.userProfileService.getAnalytics();

    return analitycs;
  }
}
