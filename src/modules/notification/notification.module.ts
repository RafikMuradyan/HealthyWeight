import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [EmailModule, JwtModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
