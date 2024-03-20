import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDataDto } from '../dtos/user-profile-data.dto';
import { MAX_WEIGHT, MIN_WEIGHT, weightDescription } from '../constants';

export class CreateUserProfileDto extends UserProfileDataDto {
  @ApiProperty({
    example: 80,
    description: weightDescription,
  })
  @IsInt({ message: 'Weight must be an integer.' })
  @Min(MIN_WEIGHT, { message: 'Weight must be positive number.' })
  @Max(MAX_WEIGHT, {
    message: `Weight must be less then or equal to ${MAX_WEIGHT}.`,
  })
  weight: number;
}
