import { Feedback } from '../feedback.entity';

export interface IConfirmedResponse {
  message: string;
  confirmedFeedback: Feedback;
}
