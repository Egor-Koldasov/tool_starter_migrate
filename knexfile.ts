import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';

export const importEnv = (dirname: string, relPath: string) => dotenv.config({'path': path.resolve(dirname, relPath)});

if (process.env.NODE_ENV === 'test') {
  importEnv(__dirname, './test.env');
}
importEnv(__dirname, './dev.env');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// create database if not exists
export const initDatabase = async () => {
  const db = knex({
    client: 'pg',
    connection: {
      ...dbConfig,
      database: 'postgres',
    },
  });
  const res = await db.raw(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname='${dbConfig.database}'`
  );
  if (res.rows.length === 0) {
    await db.raw(`CREATE DATABASE "${dbConfig.database}"`);
  }
  await db.destroy();
}

const setupKnex = async () => {
  await initDatabase();
  return {
    client: 'pg',
    connection: dbConfig,
    migrations: {
      tableName: 'migrations',
      directory: 'src/migrations',
      extension: 'ts',
    }
  };
}

export default setupKnex
