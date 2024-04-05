import { AbstractEntity } from '../../common';
import { Entity, Column, AfterLoad } from 'typeorm';

@Entity({ name: 'feedbacks' })
export class Feedback extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName!: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName!: string;

  fullName!: string;

  @Column({ nullable: false, type: 'text' })
  content!: string;

  @AfterLoad()
  updateFullNameAfterLoad() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
