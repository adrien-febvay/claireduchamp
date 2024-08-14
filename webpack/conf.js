const resolve = require('./resolve');

module.exports = {
  entry: {
    index: resolve('src/conf/index.ts'),
    silent: resolve('src/conf/silent.ts'),
  },
  // experiments: {
  //   outputModule: true,
  // },
  externals: [require('webpack-node-externals')()],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('tsconfig.conf.json'),
            },
          },
        ],
      },
    ],
  },
  node: { __dirname: true },
  optimization: { minimize: false },
  output: {
    path: resolve('.dist-tmp/conf'),
    filename: '[name].js',
    library: {
      type: "commonjs",
    },
    chunkFormat: "commonjs",
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: { '@': resolve('src') },
  },
  stats: 'errors-only',
  target: 'node',
}
