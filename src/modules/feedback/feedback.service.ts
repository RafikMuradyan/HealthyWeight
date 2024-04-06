import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = this.feedbackRepository.create(feedbackData);

    return this.feedbackRepository.save(createdFeedback);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Feedback>> {
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
