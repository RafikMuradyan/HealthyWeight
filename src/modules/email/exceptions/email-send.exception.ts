import { BadRequestException } from '@nestjs/common';

export class EmailSendException extends BadRequestException {
  constructor(error?: string) {
    super('Faild to send email', error);
  }
}
