module.exports = {
  globalSetup: './test/jest-global-setup.ts',
  globalTeardown: './test/jest-global-teardown.ts',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@domain/(.+)': '<rootDir>/src/modules/domain/$1',
    '^@modules/(.+)': '<rootDir>/src/modules/$1',
    '^@entities/(.+)': '<rootDir>/src/entities/$1',
    '^#/(.+)': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/test/**/*.spec.ts'],
};
