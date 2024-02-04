require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppRatings } from '../src/modules/app-ratings/app-ratings.entity';
import { UserProfile } from '../src/modules/user-profile/user-profile.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  synchronize: true,
  entities: [AppRatings, UserProfile],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
