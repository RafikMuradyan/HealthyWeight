import { AbstractEntity } from '../../common';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'feedbacks' })
export class Feedback extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName!: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName!: string;

  fullName!: string;

  @Column({ nullable: false, type: 'text' })
  content!: string;
}
