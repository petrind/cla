// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

const db = {
  host: 'localhost',
  port: 5434,
  username: 'test',
  password: 'test',
  database: 'test',
  type: 'postgres',
  entities: [join(__dirname + '../../**/*.entity{.ts,.js}')],
  logging: false,
  synchronize: true,
};

module.exports = {
  db,
};
