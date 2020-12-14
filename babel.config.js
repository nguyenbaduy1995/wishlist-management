const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];

const resolverPlugin = [
  require.resolve('babel-plugin-module-resolver'),
  {
    root: ['./src'],
    alias: {
      test: './test',
      logger: './src/config/logger',
    },
  },
];

module.exports = {
  presets,
  plugins: [
    resolverPlugin,
  ],
};
