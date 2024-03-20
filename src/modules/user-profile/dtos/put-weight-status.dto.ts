import { IsString, IsIn } from 'class-validator';
import { WeightStatus } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { weightStatusDescription } from '../constants';

export class PutWeightStatusDto {
  @ApiProperty({
    example: WeightStatus.NORMAL,
    description: weightStatusDescription,
  })
  @IsString()
  @IsIn(Object.values(WeightStatus), {
    message: `Weight status must be one of the following values: ${Object.values(
      WeightStatus,
    ).join(', ')}.`,
  })
  weightStatus: WeightStatus;
}
