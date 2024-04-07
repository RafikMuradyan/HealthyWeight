import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import * as jwt from 'jsonwebtoken';
import { IDecodedFeedbackToken } from './interfaces';

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
    const createdFeedback = await this.feedbackService.findAllConfirmed(
      pageOptionsDto,
    );
    return createdFeedback;
  }

  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm feedback' })
  async confirmFeedback(@Param('token') token: string): Promise<Feedback> {
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as IDecodedFeedbackToken;
      const feedbackId = decodedToken.feedbackId;
      return this.feedbackService.confirmFeedback(feedbackId);
    } catch (error) {
      return error;
    }
  }
}
