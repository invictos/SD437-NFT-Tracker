/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: ".",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  globalSetup: "<rootDir>/jest.setup.ts",
  testPathIgnorePatterns: ["<rootDir>/cypress/"]
};