import { Feedback } from '../feedback.entity';

export class FeedbackDto {
  fullName: string;
  content: string;
  isConfirmed: boolean;

  constructor(feedback: Feedback) {
    this.fullName = feedback.fullName;
    this.content = feedback.content;
    this.isConfirmed = feedback.isConfirmed;
  }
}
