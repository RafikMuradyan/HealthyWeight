export interface IBMIResult {
  minWeight: number;
  maxWeight: number;
}

export interface ICalculationResult {
  BMI: IBMIResult;

  robinsonFormula: number;
  millerFormula: number;
  devineFormula: number;
  hamwiForumla: number;
}
