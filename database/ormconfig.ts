require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppRatings } from '../src/modules/app-ratings/app-ratings.entity';
import { UserProfile } from '../src/modules/user-profile/user-profile.entity';
import databaseConfigSchema from '../src/utils/joi/database-config.schema';

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
  synchronize: false,
  entities: [AppRatings, UserProfile],
  migrations: ['dist/database/migrations/*.js'],
};

const { error } = databaseConfigSchema.validate(dataSourceOptions);

if (error) throw new Error(`Invalid database configuration: ${error.message}`);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
