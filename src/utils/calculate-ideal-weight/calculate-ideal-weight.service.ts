import { UserProfileDataDto } from 'src/modules/user-profile/dtos/user-profile-data.dto';
import { Gender } from 'src/modules/user-profile/user-profile.enums';
import {
  IBMIResult,
  ICalculationResult,
} from './calculate.ideal-weight.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateIdealWeight {
  public calculate(userProfileData: UserProfileDataDto): ICalculationResult {
    const BMI = this.byBMI(userProfileData);
    const robinsonFormula = this.byRobinson(userProfileData);
    const millerFormula = this.byMiller(userProfileData);
    const devineFormula = this.byDevine(userProfileData);
    const hamwiForumla = this.byHamwi(userProfileData);

    const result: ICalculationResult = {
      BMI,
      robinsonFormula,
      millerFormula,
      devineFormula,
      hamwiForumla,
    };

    return result;
  }

  private byBMI(userProfileData: UserProfileDataDto): IBMIResult {
    const heightMeters = userProfileData.height / 100;

    let minBMI = 0,
      maxBMI = 0;

    if (userProfileData.gender === Gender.MALE) {
      if (userProfileData.age < 18) {
        minBMI = 17.6;
        maxBMI = 25.9;
      } else {
        minBMI = 20.7;
        maxBMI = 26.4;
      }
    } else if (userProfileData.gender === Gender.FEMALE) {
      if (userProfileData.age < 18) {
        minBMI = 17.2;
        maxBMI = 25.3;
      } else {
        minBMI = 19.1;
        maxBMI = 27.0;
      }
    }

    const minWeight = Number((minBMI * heightMeters * heightMeters).toFixed(1));
    const maxWeight = Number((maxBMI * heightMeters * heightMeters).toFixed(1));

    return { minWeight, maxWeight };
  }

  private byRobinson(userProfileData: UserProfileDataDto): number {
    const heightMeters = userProfileData.height / 100;

    const heightInches = heightMeters * 39.37;

    let idealWeight = 0;
    if (userProfileData.gender === Gender.MALE) {
      idealWeight = 52 + 1.9 * (heightInches - 60);
    } else if (userProfileData.gender === Gender.FEMALE) {
      idealWeight = 49 + 1.7 * (heightInches - 60);
    }

    return Number(idealWeight.toFixed(1));
  }

  private byMiller(userProfileData: UserProfileDataDto): number {
    const heightMeters = userProfileData.height / 100;

    const heightInches = heightMeters * 39.37;

    let idealWeight = 0;
    if (userProfileData.gender === Gender.MALE) {
      idealWeight = 56.2 + 1.41 * (heightInches - 60);
    } else if (userProfileData.gender === Gender.FEMALE) {
      idealWeight = 53.1 + 1.36 * (heightInches - 60);
    }

    return Number(idealWeight.toFixed(1));
  }

  private byDevine(userProfileData: UserProfileDataDto): number {
    const heightMeters = userProfileData.height / 100;

    const heightInches = heightMeters * 39.37;

    let idealWeight = 0;
    if (userProfileData.gender === Gender.MALE) {
      idealWeight = 50 + 2.3 * (heightInches - 60);
    } else if (userProfileData.gender === Gender.FEMALE) {
      idealWeight = 45.5 + 2.3 * (heightInches - 60);
    }

    return Number(idealWeight.toFixed(1));
  }

  private byHamwi(userProfileData: UserProfileDataDto): number {
    const heightMeters = userProfileData.height / 100;

    const heightInches = heightMeters * 39.37;

    let idealWeight = 0;
    if (userProfileData.gender === Gender.MALE) {
      idealWeight = 48 + 2.7 * (heightInches - 60);
    } else if (userProfileData.gender === Gender.FEMALE) {
      idealWeight = 45.5 + 2.2 * (heightInches - 60);
    }

    return Number(idealWeight.toFixed(1));
  }
}
