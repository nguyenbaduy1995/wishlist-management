module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '/.tmp',
    '/dist',
    '/client'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/test',
    '/server/adminRoutes'
  ],
  collectCoverage: true,
  coverageReporters: [
    'text',
    'lcov'
  ],
  setupFilesAfterEnv: [
    'jest-sinon',
    './test/setup.js'
  ]
}
