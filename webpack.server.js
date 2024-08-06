/* global process */
const CopyPlugin = require('copy-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin-next');
const path = require('path');
const resolve = path.resolve.bind(path, __dirname);
const { NODE_ENV = 'production' } = process.env;
const dev = NODE_ENV === 'development';
const args = process.argv.slice(2).join(' ');

class DevClient {
  apply(compiler) {
    if (dev && !DevClient.isTapped) {
      compiler.hooks.afterPlugins.tap('DevClient', () => {
        const npm = /^win\d+$/.test(process.platform) ? 'npm.cmd' : 'npm';
        require('child_process').spawn(npm, ['run', 'dev:client'], { stdio: 'inherit' });
      });
      DevClient.isTapped = true;
    }
  }
}

module.exports = {
  entry: './src/be/index.ts',
  externals: [require('webpack-node-externals')({
    allowlist: [/\.css$/],
  })],
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /^node_modules$/,
        use: {
          loader: 'babel-loader',
          options: {
            ignore: ['dist', 'node-modules'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              url: false,
              esModule: false,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentContext: resolve('src/gui'),
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
  node: { __dirname: true },
  output: {
    path: resolve('.dist-tmp'),
    filename: 'index.js',
  },
  plugins: [
    new DevClient(),
    !dev && new CopyPlugin({
      patterns: [{ from: 'src/be/gui', to: 'gui' }],
    }),
    new ShellPlugin({
      onBuildEnd: dev && {
        env: { NODE_ENV: 'development' },
        parallel: true,
        scripts: [`nodemon .dist-tmp/index.js --watch .dist-tmp -- ${args}`],
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': resolve('src') },
  },
  target: 'node',
  watch: dev,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: ['node_modules'],
  },
}
