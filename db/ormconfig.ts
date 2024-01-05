require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppRatings } from '../src/modules/app-ratings/app-ratings.entity';
import { UserProfile } from '../src/modules/user-profile/user-profile.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL + '?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: [AppRatings, UserProfile],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
