import { AbstractEntity } from '../../common/entities';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'app_ratings' })
export class AppRatings extends AbstractEntity {
  @Column({ type: 'smallint', unsigned: true })
  rating: number;
}
