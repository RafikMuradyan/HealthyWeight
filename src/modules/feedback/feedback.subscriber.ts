import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Feedback } from './feedback.entity';

@EventSubscriber()
export class FeedbackSubscriber implements EntitySubscriberInterface<Feedback> {
  listenTo() {
    return Feedback;
  }

  async beforeInsert(event: InsertEvent<Feedback>) {
    this.updateFullName(event.entity);
  }

  async afterLoad(feedback: Feedback) {
    feedback.fullName = `${feedback.firstName} ${feedback.lastName}`;
  }

  private updateFullName(feedback: Feedback) {
    feedback.fullName = `${feedback.firstName} ${feedback.lastName}`;
  }
}
