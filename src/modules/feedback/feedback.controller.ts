import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageOptionsDto } from '../../common/dtos';
import { TokenData } from '../jwt/decorators';
import { TokenInterceptor } from '../jwt/interceptors';
import { IConfirmedResponse, ITokenPayload } from './interfaces';

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
  @UseInterceptors(TokenInterceptor)
  @ApiOperation({ summary: 'Confirm feedback' })
  async confirmFeedback(
    @TokenData() tokenData: ITokenPayload,
  ): Promise<IConfirmedResponse> {
    console.log(tokenData.feedbackId);
    return await this.feedbackService.confirmFeedback(tokenData.feedbackId);
  }
}
