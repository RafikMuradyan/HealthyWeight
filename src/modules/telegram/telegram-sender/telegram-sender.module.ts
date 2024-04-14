import { Module } from '@nestjs/common';
import { TelegramSenderService } from './telegram-sender.service';
import { TelegramController } from './telegtam-sender.controller';

@Module({
  imports: [],
  controllers: [TelegramController],
  providers: [TelegramSenderService],
  exports: [TelegramSenderService],
})
export class TelegramSenderModule {}
