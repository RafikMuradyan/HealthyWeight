import { BadRequestException } from '@nestjs/common';

export class MessageSendException extends BadRequestException {
  constructor(error?: string) {
    super('Faild to send telegram message', error);
  }
}
