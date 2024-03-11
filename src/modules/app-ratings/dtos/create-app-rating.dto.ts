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
    message: 'Rating must be an integer.',
  })
  @Min(MIN_RATING, {
    message: 'Rating must be positive number.',
  })
  @Max(MAX_RATING, {
    message: `Rating must be less than or equal to ${MAX_RATING}.`,
  })
  rating: number;
}
