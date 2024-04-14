import { BadRequestException } from '@nestjs/common';

export class MessageNotReceivedException extends BadRequestException {
  constructor(error?: string) {
    super('Nobody has received the confirmation message', error);
  }
}
