import { UserProfile } from './user-profile.entity';

export interface IUserProfileData {
  userProfiles: UserProfile[];
  count: number;
}

export interface IUserAnalytics {
  normalCount: number;
  underweightCount: number;
  overweightCount: number;
}
