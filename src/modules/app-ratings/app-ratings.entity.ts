import { AbstractEntity } from '../../common';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'app_ratings' })
export class AppRatings extends AbstractEntity {
  @Column({ type: 'smallint', unsigned: true })
  rating: number;
}
