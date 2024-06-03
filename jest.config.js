/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '<rootDir>.*(node_modules)',
        '<rootDir>.*(node_modules)(?!.*(ckeditor5-react|ckeditor5-build|ckeditor5-core|ckeditor5-highlight|ckeditor5-utils|ckeditor5-ui|lodash-es).*).js$',
    ],
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
        '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
        '^.+\\.svg$': 'jest-svg-transformer',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
        '^firebase/app$': '<rootDir>/src/services/__mocks__/firebase.js',
        '^firebase/auth$': '<rootDir>/src/services/__mocks__/firebase.js',
        '^firebase/database$': '<rootDir>/src/services/__mocks__/firebase.js',
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/app/components/Modals/AddNoteModal/AddNoteModal.jsx',
        '/src/app/components/Modals/EditNoteModal/EditNoteModal.jsx',
    ],
};

export default config;
