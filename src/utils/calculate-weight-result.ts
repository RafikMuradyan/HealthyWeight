import { WeightStatus } from 'src/modules/user-profile/user-profile.enums';

export interface IWeightStatusData {
  actualWeight: number;
  minWeight: number;
  maxWeight: number;
}

export const getWeightStatus = (
  weightData: IWeightStatusData,
): WeightStatus => {
  const { actualWeight, minWeight, maxWeight } = weightData;
  return actualWeight < minWeight
    ? WeightStatus.UNDERWEIGHT
    : actualWeight > maxWeight
    ? WeightStatus.OVERWEIGHT
    : WeightStatus.NORMAL;
};
