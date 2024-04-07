import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { NotificationService } from '../notification/notification.service';
import { IFeedbackNotification } from './interfaces';
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
    const feedback = await this.feedbackRepository.save(createdFeedback);

    const notificationData: IFeedbackNotification = {
      id: feedback.id,
      fullName: feedback.fullName,
      content: feedback.content,
    };

    await this.notificationService.sendFeedbackNotification(notificationData);

    return feedback;
  }

  async confirmFeedback(feedbackId: number): Promise<Feedback> {
    const existingFeedback = await this.feedbackRepository.findOneBy({
      id: feedbackId,
    });

    if (!existingFeedback) {
      throw new FeedbackNotFoundException();
    }

    if (existingFeedback.isConfirmed) {
      throw new FeedbackAlreadyConfirmedException();
    }

    const updatedFeedback = { ...existingFeedback, isConfirmed: true };

    return this.feedbackRepository.save(updatedFeedback);
  }

  async findAllConfirmed(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Feedback>> {
    const queryBuilder =
      this.feedbackRepository.createQueryBuilder('feedbacks');

    queryBuilder
      .orderBy('feedbacks.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const totalCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ totalCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
