import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos';
import { Feedback } from './feedback.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../common/dtos';
import { NotificationService } from '../notification/notification.service';
import { IFeedbackNotification } from '../notification/interfaces';
import { FeedbackStatus, feedbackStatusLookup } from './enums';
import { IHTMLDetails } from './interfaces';
import {
  FeedbackAlreadyConfirmedException,
  FeedbackNotFoundException,
} from './exceptions';

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

  private createHTMLBody = (htmlDetails: IHTMLDetails): string => {
    return `
    <body onload="window.close()">
    <style>
        body {
            background-color: rgb(225 221 229);
        }
        h2 {
            text-align: center;
            color: ${htmlDetails.color};
            font-weight: bolder;
            font-size: 40px;
            margin-top: 15%;
        }
    </style>
      <h2>${htmlDetails.message}</h2>
    </body>
    `;
  };

  private async confirmFeedback(feedbackId: number): Promise<Feedback> {
    const queryBuilder =
      this.feedbackRepository.createQueryBuilder('feedbacks');
    const existingFeedback = await queryBuilder
      .where('id = :id', { id: feedbackId })
      .getOne();

    if (!existingFeedback) {
      throw new FeedbackNotFoundException();
    }

    if (existingFeedback.isConfirmed) {
      throw new FeedbackAlreadyConfirmedException();
    }

    this.feedbackRepository.merge(existingFeedback, { isConfirmed: true });
    const confirmedFeedback = await this.feedbackRepository.save(
      existingFeedback,
    );
    return confirmedFeedback;
  }

  async confirmFeedbackForEmail(feedbackId: number): Promise<string> {
    try {
      await this.confirmFeedback(feedbackId);
      return this.createHTMLBody(feedbackStatusLookup.SUCCESS);
    } catch (error) {
      switch (error) {
        case error instanceof FeedbackNotFoundException:
          return this.createHTMLBody(feedbackStatusLookup.NOT_FOUND);

        case error instanceof FeedbackAlreadyConfirmedException:
          return this.createHTMLBody(feedbackStatusLookup.ALREADY_CONFIRMED);

        default:
          break;
      }
    }
  }

  async confirmFeedbackForTelegram(
    feedbackId: number,
  ): Promise<FeedbackStatus> {
    try {
      await this.confirmFeedback(feedbackId);
      return FeedbackStatus.SUCCESS;
    } catch (error) {
      switch (error) {
        case error instanceof FeedbackNotFoundException:
          return FeedbackStatus.NOT_FOUND;

        case error instanceof FeedbackAlreadyConfirmedException:
          return FeedbackStatus.ALREADY_CONFIRMED;

        default:
          break;
      }
    }
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
