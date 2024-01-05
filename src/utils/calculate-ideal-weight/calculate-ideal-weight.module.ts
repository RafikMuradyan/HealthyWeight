import { Module } from '@nestjs/common';
import { CalculateIdealWeight } from './calculate-ideal-weight.service';

@Module({
  providers: [CalculateIdealWeight],
  exports: [CalculateIdealWeight],
})
export class IdealWeightModule {}
