import { execSync, spawn, spawnSync } from 'child_process';

const CONTAINER_NAME = 'contact-list-db-test';

const pingDb = (): number | null => {
  const { status } = spawnSync(`docker`, [
    'exec',
    CONTAINER_NAME,
    'pg_isready',
  ]);
  return status;
};

const waitDbStarted = (): boolean => {
  const startTime = Date.now();
  const timeout = 10000;
  let started = false;
  while (started === false && startTime + timeout > Date.now()) {
    const status = pingDb();
    if (status === 0) {
      started = true;
    } else {
      execSync('sleep 1');
    }
  }
  return started;
};

const main = (): Promise<void> =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: '.env.test' });

    // Start the database
    const start = spawn('./bin/run-db-test');
    start.on('close', async () => {
      waitDbStarted() ? resolve() : reject('Db startup failure');
    });
  });

export default main;
