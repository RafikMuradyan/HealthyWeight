import { Gender, WeightStatus } from '../enums';
import { UserProfile } from '../user-profile.entity';

export class UserProfileDto {
  age: number;
  height: number;
  gender: Gender;
  weightStatus: WeightStatus;

  constructor(userProfile: UserProfile) {
    this.age = userProfile.age;
    this.height = userProfile.height;
    this.gender = userProfile.gender as Gender;
    this.weightStatus = userProfile.weightStatus;
  }
}
