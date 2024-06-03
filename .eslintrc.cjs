module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: 'current',
        'jest/global': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'jest'],
    rules: {
        'react/jsx-no-target-blank': 'off',
        'react/prop-types': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'jest/no-focused-tests': 'off',
        'import/no-unresolved': [
            'error',
            { ignore: ['^@testing-library/jest-dom$'] },
        ],
    },
};
