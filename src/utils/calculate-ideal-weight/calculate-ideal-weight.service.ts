import { Injectable } from '@nestjs/common';
import { UserProfileDataDto } from '../../modules/user-profile/dtos';
import { Gender, WeightStatus } from '../../modules/user-profile/enums';
import {
  IBMIResult,
  ICalculationResult,
  IWeightStatusData,
} from './interfaces';

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

  public getWeightStatus(weightData: IWeightStatusData): WeightStatus {
    const { actualWeight, minWeight, maxWeight } = weightData;
    return actualWeight < minWeight
      ? WeightStatus.UNDERWEIGHT
      : actualWeight > maxWeight
      ? WeightStatus.OVERWEIGHT
      : WeightStatus.NORMAL;
  }

  private byBMI(userProfileData: UserProfileDataDto): IBMIResult {
    const heightMeters = userProfileData.height / 100;

    const minBMI = 18.5,
      maxBMI = 25;

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
