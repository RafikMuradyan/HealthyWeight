import { IsString, IsIn } from 'class-validator';
import { WeightStatus } from '../user-profile.enums';
import { ApiProperty } from '@nestjs/swagger';
import { weightStatusDescription } from '../user-profile.constants';

export class PutWeightStatusDto {
  @ApiProperty({
    example: 'Normal',
    description: weightStatusDescription,
  })
  @IsString()
  @IsIn(Object.values(WeightStatus), {
    message: 'Weight status must be Normal, Overwaight or Underwaight',
  })
  weightStatus: WeightStatus;
}
