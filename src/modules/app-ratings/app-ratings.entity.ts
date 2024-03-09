import { AbstractEntity } from '../../common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class AppRatings extends AbstractEntity {
  @Column({ type: 'smallint', unsigned: true })
  rating: number;
}
