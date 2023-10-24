import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender, WeightStatus } from './user-profile.enums';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'smallint',
    unsigned: true
  })
  age: number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  height: number;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: string;

  @Column({
    type: 'enum',
    enum: WeightStatus,
    nullable: true
  })
  weightStatus: WeightStatus | null;
}