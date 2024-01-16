import { UserProfile } from './user-profile.entity';
import { Gender, WeightStatus, AgeRange } from './user-profile.enums';

export interface IUserProfileData {
  userProfiles: UserProfile[];
  count: number;
}

interface IBaseAnalitic {
  count: number;
}

interface IByGender extends IBaseAnalitic {
  gender: Gender;
}

interface IByWeightStatus extends IBaseAnalitic {
  weightStatus: WeightStatus;
}

interface IByAge extends IBaseAnalitic {
  age: number;
}

export interface IUserAnalytics {
  byGender: Array<IByGender>
  byWeightStatus: Array<IByWeightStatus>
  byAge: Array<IByAge>
}
