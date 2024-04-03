import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  firstNameDescription,
  FIRST_NAME_LENGTH,
  lastNameDescription,
  LAST_NAME_LENGTH,
  contentDescription,
  CONTENT_LENGTH,
} from '../constants';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'John',
    description: firstNameDescription,
  })
  @IsString()
  @MaxLength(FIRST_NAME_LENGTH)
  firstName!: string;

  @ApiProperty({
    example: 'Smith',
    description: lastNameDescription,
  })
  @IsString()
  @MaxLength(LAST_NAME_LENGTH)
  lastName!: string;

  @ApiProperty({
    example: 'Great product, I really enjoyed using it!',
    description: contentDescription,
  })
  @IsString()
  @MaxLength(CONTENT_LENGTH)
  content!: string;
}
