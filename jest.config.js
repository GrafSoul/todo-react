/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@components/(.*)$': '<rootDir>/src/app/components/$1',
        '^@store/(.*)$': '<rootDir>/src/app/store/$1',
        '^@layout/(.*)$': '<rootDir>/src/app/layout/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@utils/(.*)$': '<rootDir>/src/app/utils/$1',
        '^.+\\.svg$': 'jest-svg-transformer',
        '^.+\\.(css|scss)$': 'identity-obj-proxy',
        '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
    },
};

export default config;
