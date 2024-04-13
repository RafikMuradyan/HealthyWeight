import { NotFoundException } from '@nestjs/common';

export class FeedbackNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Feedback does not exist', error);
  }
}
