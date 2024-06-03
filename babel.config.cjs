module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-flow'],
    ],
    plugins: [
        'babel-plugin-transform-vite-meta-env',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components',
    ],
};
