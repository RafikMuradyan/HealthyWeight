import { Body, Controller, Post } from '@nestjs/common';

import { TelegramSenderService } from './telegram-sender.service';
import { IFeedbackNotification } from '../../notification/interfaces';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramSenderService) {}

  @Post()
  async create(@Body() feedback: IFeedbackNotification): Promise<boolean> {
    await this.telegramService.sendConfirmationMessage(feedback);

    return true;
  }
}
