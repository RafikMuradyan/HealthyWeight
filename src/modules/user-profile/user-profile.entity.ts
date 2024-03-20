import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import { Gender, WeightStatus } from './enums';

@Entity({ name: 'user_profile' })
export class UserProfile extends AbstractEntity {
  @Column({ type: 'smallint', unsigned: true })
  age: number;

  @Column({ type: 'smallint', unsigned: true })
  height: number;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ type: 'enum', enum: WeightStatus })
  weightStatus: WeightStatus;
}
