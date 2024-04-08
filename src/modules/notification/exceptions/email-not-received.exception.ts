import { BadRequestException } from '@nestjs/common';

export class EmailNotReceivedException extends BadRequestException {
  constructor(error?: string) {
    super('Nobody has received the confirmation email', error);
  }
}
