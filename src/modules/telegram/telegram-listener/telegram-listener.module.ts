import { Module } from '@nestjs/common';
import { TelegramListenerService } from './telegram-listener.service';
import { FeedbackModule } from 'src/modules/feedback/feedback.module';

@Module({
  imports: [FeedbackModule],
  providers: [TelegramListenerService],
  exports: [TelegramListenerService],
})
export class TelegramListenerModule {}
