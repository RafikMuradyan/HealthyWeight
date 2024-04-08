import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
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

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = this.feedbackRepository.create(feedbackData);

    const feedbackPromise = this.feedbackRepository.save(createdFeedback);
    const notificationData: IFeedbackNotification = {
      id: createdFeedback.id,
      fullName: createdFeedback.fullName,
      content: createdFeedback.content,
    };
    await this.notificationService.sendFeedbackNotification(notificationData);

    const feedback = await feedbackPromise;

    return feedback;
  }

  async confirmFeedback(feedbackId: number): Promise<IConfirmedResponse> {
    const queryBuilder =
      this.feedbackRepository.createQueryBuilder('feedbacks');
    const existingFeedback = await queryBuilder
      .where('id = :id', { id: feedbackId })
      .getOne();

    if (!existingFeedback) {
      throw new FeedbackNotFoundException();
    }

    if (existingFeedback.isConfirmed) {
      throw new FeedbackConfirmedException();
    }

    this.feedbackRepository.merge(existingFeedback, { isConfirmed: true });
    const updatedRaw = await this.feedbackRepository.save(existingFeedback);

    const result: IConfirmedResponse = {
      message: confirmedMessage,
      confirmedFeedback: updatedRaw,
    };

    return result;
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
