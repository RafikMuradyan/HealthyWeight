import { BadRequestException } from '@nestjs/common';

export class InvalidEmailCredentialsException extends BadRequestException {
  constructor(error?: string) {
    super('Invalid email credentials', error);
  }
}
