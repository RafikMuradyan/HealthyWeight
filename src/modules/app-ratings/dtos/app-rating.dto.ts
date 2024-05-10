import { AppRatings } from '../app-ratings.entity';

export class AppRatingDto {
  rating: number;

  constructor(createAppRatingDto: AppRatings) {
    this.rating = createAppRatingDto.rating;
  }
}
