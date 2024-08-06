const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const { SourceMapDevToolPlugin } = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              url: false,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: 'src-[path]___[name]__[local]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 2,
                includePaths: [resolve('src/gui/assets/scss')],
              },
            },
          }
        ],
      },
    ],
  },
  output: {
    filename: 'js/[name].[chunkhash].min.js',
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
      filename: `css/[name].css`,
    }),
    new SourceMapDevToolPlugin({
      exclude: /node_modules/,
      columns: true,
      test: /\.tsx?|\.ts?|\.js?$/,
      filename: 'js/[name].[chunkhash].js.map',
    }),
  ],
};
