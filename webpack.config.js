/* global process */
const CopyPlugin = require('copy-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin-next');
const path = require('path');
const resolve = path.resolve.bind(path, __dirname);
const { NODE_ENV = 'production' } = process.env;
const dev = NODE_ENV === 'development';
const args = process.argv.slice(2).join(' ');

module.exports = {
  entry: './src/index.ts',
  externals: [require('webpack-node-externals')()],
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  node: { __dirname: true },
  output: {
    path: resolve('dist-tmp'),
    filename: 'index.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/gui', to: 'gui' }],
    }),
    new ShellPlugin({
      onBuildEnd: dev && {
        env: { NODE_ENV: 'development' },
        parallel: true,
        scripts: [`nodemon dist-tmp/index.js --watch dist-tmp -- ${args}`],
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: { '@': resolve('src') },
  },
  target: 'node',
  watch: dev,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: ['node_modules'],
  },
}
