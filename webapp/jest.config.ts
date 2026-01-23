import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                        // <-- use ts-jest for TypeScript
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',               // <-- transform TS/TSX files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',             // map @/ imports to root
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // optional for CSS modules
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;
