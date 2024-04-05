import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './feedback.entity';

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

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }
}
