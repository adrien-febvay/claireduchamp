const readdirSync = require('fs').readdirSync;
const path = require('path');
const resolve = path.resolve.bind(path, __dirname);

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin');
const { mergeWithCustomize } = require('webpack-merge');

const dev = /^(development|test)$/.test(process.env.NODE_ENV);
const mode = dev ? 'development' : 'production';
const assets = readdirSync('src/gui/assets').filter((el) => el !== 'scss' && el !== 'svg');
const patterns = assets.map((el) => ({ from: `assets/${el}`, to: el }));
const copyAssets = assets.length ? new CopyWebpackPlugin({ patterns }) : [];

module.exports = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === 'module.rules') {
      const testList = b.map(item => item.test.toString());
      return a
        .filter(item => !testList.includes(item.test.toString()))
        .concat(b);
    }
  }
})({
  context: resolve('src/gui'),
  entry: ['babel-polyfill', resolve(`src/gui/index.tsx`)],
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /^node_modules$/,
        use: {
          loader: 'babel-loader',
          options: {
            ignore: ['.tsc', '.dist-tmp', 'dist', 'node-modules'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              url: false,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: 'src-[path]___[name]__[local]',
                namedExport: false,
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
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'img/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: { optimizationLevel: 7 },
              gifsicle: { interlaced: false },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // viewBox is required to resize SVGs with CSS.
                      // @see https://github.com/svg/svgo/issues/1128
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  optimization: {
    moduleIds: 'named'
  },
  output: {
    path: resolve('src/be/gui'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inlineSource: 'runtime~.+\\.js',
      chunksSortMode: 'none',
    }),
    new InlineSourcePlugin(),
  ].concat(copyAssets),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': resolve('src') },
  },
}, require(`./webpack.client.${mode}.js`));
