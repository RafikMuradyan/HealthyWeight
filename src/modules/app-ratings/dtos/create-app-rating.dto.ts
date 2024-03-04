import { IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_RATING,
  MIN_RATING,
  ratingDescription,
} from '../app-ratings.constants';

export class CreateAppRatingDto {
  @ApiProperty({
    example: 5,
    description: ratingDescription,
  })
  @IsInt({
    message: 'Age must be an integer',
  })
  @Min(MIN_RATING, {
    message: 'Age must be positive number',
  })
  @Max(MAX_RATING, {
    message: `App rating mus be less or equal to ${MAX_RATING}`,
  })
  rating: number;
}
