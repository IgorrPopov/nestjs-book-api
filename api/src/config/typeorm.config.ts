import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT);
const POSTGRES_HOST = process.env.POSTGRES_HOST;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB_NAME,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
