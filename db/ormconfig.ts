import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL + '?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
