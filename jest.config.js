module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/tests/**/*.test.js',
        '**/tests/**/*.spec.js'
    ],
    collectCoverageFrom: [
        'src/**/.js',
        '!src/config/db.js',
        '!src/models/server.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', '1cov', 'setup.js'],
    setupFDilesAfterEnv: ['<rootDir>/tests/setup.js'],
testTimeout:10000
}