import { NotFoundException } from '@nestjs/common';

export class MissingFeedbackIdException extends NotFoundException {
  constructor(error?: string) {
    super('Feedback id is missing from the token payload', error);
  }
}
