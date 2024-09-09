const { conf } = require('../dist-dev/conf/silent');

function runOnce(fn) {
  return (...args) => {
    fn?.(...args);
    fn = null;
  }
}

class Notifier {
  apply = runOnce((compiler) => {
    compiler.hooks.afterEmit.tap('Notifier.emit', () => {
      process.stdout.write(`>> \x1b[32mDone!\x1b[0m GUI running on port \x1b[33m${conf.devGuiPort}\x1b[0m\n`);
    });
    compiler.hooks.afterEmit.tap('Notifier.emitOnce', runOnce(() => {
      compiler.hooks.watchRun.tap('Notifier.update', () => {
        process.stdout.write('\n>> \x1b[32mChange detected!\x1b[0m Updating GUI...\n');
      });
    }));
  });
}

module.exports = {
  devServer: {
    allowedHosts: "all",
    historyApiFallback: { disableDotRule: true },
    host: '::1',
    port: conf.devGuiPort,
  },
  infrastructureLogging: { level: 'error' },
  module: {
    rules: require('./loaders')(['style-loader', 'css-modules-typescript-loader']),
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new Notifier(),
  ],
  stats: 'errors-only',
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: ['node_modules'],
  },
};
