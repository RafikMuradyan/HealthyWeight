import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), EmailModule],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
