import { UserProfile } from './user-profile.entity';
import { WeightStatus } from './user-profile.enums';

export interface IUserProfileData {
  userProfiles: UserProfile[];
  count: number;
}

export interface IUserAnalytics {
  weightStatus: WeightStatus,
  count: number,
}
