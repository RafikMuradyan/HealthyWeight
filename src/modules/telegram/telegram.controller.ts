import { Controller, Get } from '@nestjs/common';

import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get()
  async create(): Promise<boolean> {
    await this.telegramService.sendConfirmationMessage(null);

    return true;
  }
}
