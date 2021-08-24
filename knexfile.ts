module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://admin:devpassword@localhost:5432/dev_overview?sslmode=disable',
  migrations: {
    tableName: 'migrations',
    directory: 'src/migrations',
    extension: 'ts',
  }
};