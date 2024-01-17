import { IsString, IsInt, IsIn, Min, Max } from 'class-validator';
import { Gender } from '../user-profile.enums';

export class UserProfileDataDto {
  @IsInt({ message: 'Age must be an integer' })
  @Min(1, { message: 'Age must be positive number' })
  @Max(100, { message: 'Age must be less then or equal to 100' })
  age: number;

  @IsInt({ message: 'Height must be an integer' })
  @Min(1, { message: 'Height must be positive number' })
  @Max(260, { message: 'Height must be less then or equal to 260' })
  height: number;

  @IsString()
  @IsIn(Object.values(Gender), { message: 'Gender must be Male or Female' })
  gender: Gender;
}
