import { IsString, IsInt, IsIn, Min } from 'class-validator';
import { Gender } from '../user-profile.enums';

export class CreateUserProfileDto {
  @IsInt({ message: 'Age must be an integer' })
  @Min(1, { message: 'Age must be positive number' })
  age: number;

  @IsInt({ message: 'Height must be an integer' })
  @Min(1, { message: 'Height must be positive number' })
  height: number;

  @IsString()
  @IsIn(Object.values(Gender), { message: 'Gender must be Male or Female' })
  gender: Gender;
}
