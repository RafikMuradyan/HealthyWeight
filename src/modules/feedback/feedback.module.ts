import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import { NotificationModule } from '../notification/notification.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    NotificationModule,
    JwtModule,
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
