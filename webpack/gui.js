const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin');
const CopyAssetsPlugin = require('./gui-copy-assets');
const resolve = require('./resolve');

module.exports = require('webpack-merge').merge({
  context: resolve('src/gui'),
  entry: resolve('src/gui/index.tsx'),
  mode: process.env.NODE_ENV,
  optimization: {
    moduleIds: 'named'
  },
  output: {
    path: resolve('.dist-tmp/gui'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inlineSource: 'runtime~.+\\.js',
      chunksSortMode: 'none',
    }),
    new InlineSourcePlugin(),
    new CopyAssetsPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': resolve('src') },
  },
}, require(`./gui.${process.env.GUI_MODE}.js`));
