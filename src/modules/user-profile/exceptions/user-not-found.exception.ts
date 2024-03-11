import { NotFoundException } from '@nestjs/common';

export class UserProfileNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('User profile does not exist', error);
  }
}
