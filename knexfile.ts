import dotenv from 'dotenv';
import path from 'path';

export const importEnv = (dirname: string, relPath: string) => dotenv.config({'path': path.resolve(dirname, relPath)});

if (process.env.NODE_ENVIRONMENT === 'test') {
  importEnv(__dirname, './test.env');
}
importEnv(__dirname, './dev.env');

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
    directory: 'src/migrations',
    extension: 'ts',
  }
};