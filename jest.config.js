module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    './src/index.ts'
  ],
  testMatch: [ 
    "**\\src\\__tests__\\*.test.ts"
  ]
};