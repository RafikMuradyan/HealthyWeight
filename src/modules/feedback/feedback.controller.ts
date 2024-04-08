import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos';
import { Feedback } from './feedback.entity';
import { PageDto, PageOptionsDto } from '../../common/dtos';
import { TokenData } from '../jwt/decorators';
import { IConfirmedResponse, ITokenPayload } from './interfaces';
import {
  ConfirmFeedbackDecorator,
  CreateFeedback,
  FindAllFeedbacks,
} from './decorators';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @CreateFeedback()
  async create(@Body() feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = await this.feedbackService.create(feedbackData);
    return createdFeedback;
  }

  @Get()
  @FindAllFeedbacks()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Feedback>> {
    const createdFeedback = await this.feedbackService.findAllConfirmed(
      pageOptionsDto,
    );
    return createdFeedback;
  }

  @Get('confirm/:token')
  @ConfirmFeedbackDecorator()
  async confirmFeedback(
    @TokenData() tokenData: ITokenPayload,
  ): Promise<IConfirmedResponse> {
    return await this.feedbackService.confirmFeedback(tokenData.feedbackId);
  }
}
