/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

// if custom-environment-variables.js exist and env variable is exist,
//   then value below will be overriden
const db = {
  host: 'localhost',
  port: 4432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  type: 'postgres',
  entities: [join(__dirname + '../../../dist/**/*.entity.js')],
  synchronize: true,
  logging: ['schema', 'error', 'warn'],
};

module.exports = {
  db,
};
