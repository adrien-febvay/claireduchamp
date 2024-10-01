const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SourceMapDevToolPlugin = require('webpack').SourceMapDevToolPlugin;
const { getLocalIdent, SaveLocalIdent } = require('./css-ident');
const resolve = require('./resolve');

const filename = (pattern) => ({ filename: pattern.replace('*', '[name].[chunkhash]') });

module.exports = {
  module: {
    rules: require('./loaders')([MiniCssExtractPlugin.loader], {
      modules: { getLocalIdent },
    }),
  },
  output: {
    ...filename('js/*.min.js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      ...filename('css/*.min.css'),
    }),
    new SourceMapDevToolPlugin({
      exclude: /node_modules|dist-*/,
      columns: true,
      test: /\.[jt]sx?$/,
      ...filename('js/*.min.map'),
    }),
    new SaveLocalIdent(resolve.outDir('css-ident-map.json')),
  ],
};
