import { ForbiddenException } from '@nestjs/common';

export class SenderIsNotAdmin extends ForbiddenException {
  constructor(error?: string) {
    super('Only admins are allowed to perform this action.', error);
  }
}
