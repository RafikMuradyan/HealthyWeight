import { IsString, IsInt, IsIn, Min, Max } from 'class-validator';
import { Gender } from '../user-profile.enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_AGE,
  MAX_HEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  MIN_WEIGHT,
  ageDescription,
  genderDescription,
  heightDescription,
  weightDescription,
} from '../user-profile.constants';

export class CreateUserProfileDto {
  @ApiProperty({
    example: 25,
    description: ageDescription,
  })
  @IsInt({ message: 'Age must be an integer' })
  @Min(MIN_AGE, { message: 'Age must be positive number' })
  @Max(MAX_AGE, { message: `Age must be less then or equal to ${MAX_AGE}` })
  age: number;

  @ApiProperty({
    example: 180,
    description: heightDescription,
  })
  @IsInt({ message: 'Height must be an integer' })
  @Min(MIN_HEIGHT, { message: 'Height must be positive number' })
  @Max(MAX_HEIGHT, {
    message: `Height must be less then or equal to ${MAX_HEIGHT}`,
  })
  height: number;

  @ApiProperty({
    example: 80,
    description: weightDescription,
  })
  @IsInt({ message: 'Weight must be an integer' })
  @Min(MIN_WEIGHT, { message: 'Weight must be positive number' })
  @Max(MAX_WEIGHT, {
    message: `Weight must be less then or equal to ${MAX_WEIGHT}`,
  })
  weight: number;

  @ApiProperty({
    example: 'Male',
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
