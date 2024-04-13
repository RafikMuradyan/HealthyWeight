import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Feedback } from './feedback.entity';
@EventSubscriber()
export class FeedbackSubscriber implements EntitySubscriberInterface<Feedback> {
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  listenTo() {
    return Feedback;
  }

  async beforeInsert(event: InsertEvent<Feedback>): Promise<void> {
    this.updateFullName(event.entity);
  }

  async afterLoad(feedback: Feedback): Promise<void> {
    feedback.fullName = `${feedback.firstName} ${feedback.lastName}`;
  }

  private updateFullName(feedback: Feedback): void {
    feedback.fullName = `${feedback.firstName} ${feedback.lastName}`;
  }
}
