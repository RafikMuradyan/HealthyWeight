import { UserProfile } from './user-profile.entity';

export interface IUserProfileData {
  userProfiles: UserProfile[];
  count: number;
}
