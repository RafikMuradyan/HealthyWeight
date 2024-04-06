import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageOptionsDto } from 'src/common/dtos';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new feedback' })
  async create(@Body() feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = await this.feedbackService.create(feedbackData);
    return createdFeedback;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list of feedbacks' })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Feedback>> {
    const createdFeedback = await this.feedbackService.findAll(pageOptionsDto);
    return createdFeedback;
  }
}
