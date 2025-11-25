/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
