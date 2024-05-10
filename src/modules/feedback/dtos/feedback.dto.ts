import { Feedback } from '../feedback.entity';

export class FeedbackDto {
  firstName: string;
  lastName: string;
  fullName: string;
  content: string;
  isConfirmed: boolean;

  constructor(feedback: Feedback) {
    this.firstName = feedback.firstName;
    this.lastName = feedback.lastName;
    this.fullName = feedback.fullName;
    this.content = feedback.content;
    this.isConfirmed = feedback.isConfirmed;
  }
}
