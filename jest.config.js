module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    './src/index.ts'
  ],
  testMatch: [ 
    "**\\src\\__tests__\\specs\\*.test.ts"
  ],
  setupFilesAfterEnv: [ 
    "./setupTests.ts"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json"
    }
  }
};