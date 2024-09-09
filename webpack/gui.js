const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin');
const CopyAssetsPlugin = require('./gui-copy-assets');
const resolve = require('./resolve');

const { NODE_ENV, BE_MODE, GUI_MODE } = process.env;
const env = { NODE_ENV, BE_MODE, GUI_MODE };

module.exports = require('webpack-merge').merge({
  context: resolve('src/gui'),
  entry: resolve('src/gui/index.tsx'),
  mode: NODE_ENV,
  optimization: {
    moduleIds: 'named'
  },
  output: {
    path: resolve.outDir('gui'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new EnvironmentPlugin(env),
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
}, require(`./gui.${GUI_MODE}.js`));
