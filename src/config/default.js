/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

const db = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  type: 'postgres',
  entities: [join(__dirname + '../../../dist/**/*.entity.js')],
  synchronize: true,
  logging: ['schema', 'error', 'warn'],
};

module.exports = {
  app,
  db,
};
