import { IsInt, Max, Min } from 'class-validator';
import { MAX_RATING } from '../constants';

export class CreateAppRatingDto {
  @IsInt({
    message: 'Age must be an integer',
  })
  @Min(1, {
    message: 'Age must be positive number',
  })
  @Max(MAX_RATING, {
    message: `App rating mus be less or equal to ${MAX_RATING}`,
  })
  rating: number;
}
