import { ConflictException } from '@nestjs/common';

export class FeedbackAlreadyConfirmedException extends ConflictException {
  constructor(error?: string) {
    super('Feedback already confirmed', error);
  }
}
