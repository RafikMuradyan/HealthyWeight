import { IsString, IsInt, IsIn, Min, Max } from 'class-validator';
import { Gender } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_AGE,
  MAX_HEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  ageDescription,
  genderDescription,
  heightDescription,
} from '../constants';

export class UserProfileDataDto {
  @ApiProperty({
    example: 25,
    description: ageDescription,
  })
  @IsInt({ message: 'Age must be an integer.' })
  @Min(MIN_AGE, { message: 'Age must be positive number.' })
  @Max(MAX_AGE, { message: `Age must be less then or equal to ${MAX_AGE}.` })
  age: number;

  @ApiProperty({
    example: 180,
    description: heightDescription,
  })
  @IsInt({ message: 'Height must be an integer.' })
  @Min(MIN_HEIGHT, { message: 'Height must be positive number.' })
  @Max(MAX_HEIGHT, {
    message: `Height must be less then or equal to ${MAX_HEIGHT}.`,
  })
  height: number;

  @ApiProperty({
    example: `${Gender.MALE}`,
    description: genderDescription,
  })
  @IsString()
  @IsIn(Object.values(Gender), {
    message: `Gender must be one of the following values: ${Object.values(
      Gender,
    ).join(', ')}.`,
  })
  gender: Gender;
}
