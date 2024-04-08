import { ConflictException } from '@nestjs/common';

export class FeedbackConfirmedException extends ConflictException {
  constructor(error?: string) {
    super('Feedback already confrmed', error);
  }
}
