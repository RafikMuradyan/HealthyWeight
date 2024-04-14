import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '../jwt/jwt.module';
import { TelegramSenderModule } from '../telegram/telegram-sender/telegram-sender.module';

@Module({
  imports: [EmailModule, JwtModule, TelegramSenderModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
