import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../common/dtos';
import { NotificationService } from '../notification/notification.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
  ) {}

  async create(feedbackData: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = this.feedbackRepository.create(feedbackData);

    const feedback = await this.feedbackRepository.save(createdFeedback);
    const { fullName, content, id } = feedback;
    await this.notificationService.sendFeedbackNotification({
      fullName,
      content,
      id,
    });

    return feedback;
  }

  async confirmFeedback(token: string): Promise<Feedback> {
    try {
      const decodedToken = this.jwtService.verifyToken(token);
      const { feedbackId } = decodedToken;

      const queryBuilder =
        this.feedbackRepository.createQueryBuilder('feedbacks');
      const existingFeedback = await queryBuilder
        .where('id = :id', { id: feedbackId })
        .getOne();

      if (!existingFeedback) {
        throw new NotFoundException('Feedback not found');
      }

      this.feedbackRepository.merge(existingFeedback, { isConfirmed: true });
      const updatedRaw = await this.feedbackRepository.save(existingFeedback);

      return updatedRaw;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        console.error('Error in confirmFeedback:', error);
        throw new InternalServerErrorException('An unexpected error occurred');
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
