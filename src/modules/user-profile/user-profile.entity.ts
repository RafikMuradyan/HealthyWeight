import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Gender, WeightStatus } from './user-profile.enums';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

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
    nullable: true,
  })
  weightStatus: WeightStatus | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
