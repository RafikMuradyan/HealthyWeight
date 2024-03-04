import { IsString, IsInt, IsIn, Min, Max } from 'class-validator';
import { Gender } from '../user-profile.enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_AGE,
  MAX_HEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  ageDescription,
  genderDescription,
  heightDescription,
} from '../user-profile.constants';

export class UserProfileDataDto {
  @ApiProperty({
    example: '80',
    description: ageDescription,
  })
  @IsInt({ message: 'Age must be an integer' })
  @Min(MIN_AGE, { message: 'Age must be positive number' })
  @Max(MAX_AGE, { message: `Age must be less then or equal to ${MAX_AGE}` })
  age: number;

  @ApiProperty({
    example: '180',
    description: heightDescription,
  })
  @IsInt({ message: 'Height must be an integer' })
  @Min(MIN_HEIGHT, { message: 'Height must be positive number' })
  @Max(MAX_HEIGHT, {
    message: `Height must be less then or equal to ${MAX_HEIGHT}`,
  })
  height: number;

  @ApiProperty({
    example: 'Normal',
    description: genderDescription,
  })
  @IsString()
  @IsIn(Object.values(Gender), { message: 'Gender must be Male or Female' })
  gender: Gender;
}
