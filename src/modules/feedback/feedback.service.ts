import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos';
import { Feedback } from './feedback.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../common/dtos';
import { NotificationService } from '../notification/notification.service';
import {
  FeedbackConfirmedException,
  FeedbackNotFoundException,
} from './exceptions';
import { IConfirmedResponse } from './interfaces';
import { confirmedMessage } from './constants';
import { IFeedbackNotification } from '../notification/interfaces';
import { FeedbackEnum } from './enums';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = this.feedbackRepository.create(feedbackData);
    const savedFeedback = await this.feedbackRepository.save(createdFeedback);

    const notificationData: IFeedbackNotification = {
      id: savedFeedback.id,
      fullName: savedFeedback.fullName,
      content: savedFeedback.content,
    };
    await this.notificationService.sendFeedbackNotification(notificationData);

    return savedFeedback;
  }

  private createHTMLBody = (message: string, color: string): string => {
    return `
    <body onload="window.close()">
    <style>
        body {
            background-color: rgb(225 221 229);
        }
        h2 {
            text-align: center;
            color: ${color};
            font-weight: bolder;
            font-size: 40px;
            margin-top: 15%;
        }
    </style>
      <h2>${message}</h2>
    </body>
    `;
  };

  async confirmFeedback(feedbackId: number): Promise<string> {
    const queryBuilder =
      this.feedbackRepository.createQueryBuilder('feedbacks');
    const existingFeedback = await queryBuilder
      .where('id = :id', { id: feedbackId })
      .getOne();

    if (!existingFeedback) {
      this.createHTMLBody('Feedback does not exist', '#b61a1f');
      // throw new FeedbackNotFoundException();
    }

    if (existingFeedback.isConfirmed) {
      return this.createHTMLBody('Feedback Is Already Confrmed', '#3b3bad');
      // throw new FeedbackConfirmedException();
    }

    this.feedbackRepository.merge(existingFeedback, { isConfirmed: true });
    const updatedRaw = await this.feedbackRepository.save(existingFeedback);

    const result: IConfirmedResponse = {
      message: confirmedMessage,
      confirmedFeedback: updatedRaw,
    };

    return this.createHTMLBody(FeedbackEnum.SUCCESS, '#23833a');
    // return result;
  }

  async findAllConfirmed(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Feedback>> {
    const queryBuilder =
      this.feedbackRepository.createQueryBuilder('feedbacks');

    queryBuilder
      .where('feedbacks.isConfirmed = :isConfirmed', { isConfirmed: true })
      .orderBy('feedbacks.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const totalCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ totalCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
