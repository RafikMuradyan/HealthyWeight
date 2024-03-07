import { Entity, Column } from 'typeorm';
import { Gender, WeightStatus } from './user-profile.enums';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity()
export class UserProfile extends AbstractEntity {
  @Column({
    type: 'smallint',
    unsigned: true,
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
  })
  weightStatus: WeightStatus;
}
