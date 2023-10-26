import {
    IsString,
    IsIn,
} from 'class-validator';
import {  WeightStatus } from '../user-profile.enums';

export class PutWeigthStatusDto {
    @IsString()
    @IsIn(
        Object.values(WeightStatus),
        { message: 'Weight status must be Normal, Overwaight or Underwaight' },
    )
    weightStatus: WeightStatus;
}