const { conf } = require('../.dist-tmp/conf/silent');

module.exports = {
  devServer: {
    historyApiFallback: { disableDotRule: true },
    host: '::1',
    allowedHosts: "all",
    port: conf.devGuiPort,
  },
  module: {
    rules: require('./loaders')(['style-loader', 'css-modules-typescript-loader']),
  },
  output: {
    filename: '[name].js',
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: ['node_modules', 'dist'],
  },
};
