import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new feedback' })
  @UsePipes(new ValidationPipe())
  async createFeedback(
    @Body() feedbackData: CreateFeedbackDto,
  ): Promise<Feedback> {
    const createdFeedback = await this.feedbackService.create(feedbackData);
    return createdFeedback;
  }
}
