import { ConflictException } from '@nestjs/common';

export class FeedbackAlreadyConfirmedException extends ConflictException {
  constructor(error?: string) {
    super('Feedback alerady confirmed', error);
  }
}
