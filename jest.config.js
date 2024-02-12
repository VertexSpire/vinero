/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  workerIdleMemoryLimit: '1024MB',
  testMatch: ['<rootDir>/app/api/v2/tests/unit/**', '<rootDir>/app/api/v2/tests/integration/**'],
  // This option is just for using --watch
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/app/api/v2/dist/'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/app/api/v2/src/$1',
    '^tests/(.*)$': '<rootDir>/app/api/v2/tests/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/app/api/v2/tests/helpers/setup.ts'],
  collectCoverageFrom: ['<rootDir>/app/api/v2/src/**'],
  globalSetup: '<rootDir>/app/api/v2/tests/helpers/globalSetup.ts',
  globalTeardown: '<rootDir>/app/api/v2/tests/helpers/globalTeardown.ts',
};

module.exports = config;
