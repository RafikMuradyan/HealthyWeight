import { UserProfile } from './user-profile.entity';
import { Gender, WeightStatus, AgeRange } from './user-profile.enums';

export interface IUserProfileData {
  userProfiles: UserProfile[];
  count: number;
}

export interface IUserAnalytics {
  byGender: {
    gender: Gender;
    count: number;
  }[];

  byWeightStatus: {
    weightStatus: WeightStatus;
    count: number;
  }[];

  byAge: {
    ageRange: AgeRange;
    count: number;
  }[];
}
