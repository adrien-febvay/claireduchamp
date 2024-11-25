/* global process */
const { EnvironmentPlugin } = require('webpack');
const MinifyCssIdentsPlugin = require("minify-css-idents");
const resolve = require('./resolve');
const { npx, spawn, webpack } = require('./run');

const { NODE_ENV, BE_MODE, GUI_MODE } = process.env;
const env = { NODE_ENV, BE_MODE, GUI_MODE };
const dev = NODE_ENV === 'development';
const serve = /^serve\b/.test(BE_MODE);

function runOnce(fn) {
  return (...args) => {
    fn?.(...args);
    fn = null;
  }
}

class Gui {
  apply = runOnce((compiler) => {
    if (GUI_MODE === 'build') {
      webpack.build('gui', env);
    } else {
      compiler.hooks.afterEmit.tap('Gui.emit', runOnce(() => void webpack.serve('gui', env)));
    }
  });
}

class Launcher {
  apply = runOnce((compiler) => {
    compiler.hooks.afterEmit.tap('Launcher.emitOnce', runOnce(() => {
      if (serve) {
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, starting...\n');
        spawn('nodemon', ['dist-dev/be', '--quiet', '--watch', 'dist-dev/be']);
        process.stdout.write('Type \x1b[32;1mrs\x1b[0m and hit enter to manually restart BE\n');
        compiler.hooks.watchRun.tap('Launcher.update', () => process.stdout.write('\n>> \x1b[32mChange detected!\x1b[0m Updating BE...\n'))
        compiler.hooks.afterEmit.tap('Launcher.emitAgain', () => process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, restarting...\n'));
      } else if (dev) {
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, starting...\n');
        spawn.sync('node', ['dist-dev/be']);
      } else {
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, prerendering pages...\n');
        npx.spawn.sync({ ...env, PRERENDER: 'true'}, ['node', 'dist-prod-tmp/be']);
        process.stdout.write('>> \x1b[32mDone!\x1b[0m Build complete\n');
      }
    }));
  });
}

module.exports = {
  entry: './src/be/index.ts',
  externals: [require('webpack-node-externals')({
    allowlist: [/\.css$/],
  })],
  mode: 'development',
  module: {
    rules: require('./loaders')(['style-loader'], {
      modules: {
        localIdentContext: resolve('src/gui'),
      },
    }),
  },
  node: { __dirname: true },
  optimization: { minimize: false },
  output: {
    path: resolve.outDir('be'),
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new EnvironmentPlugin(env),
    new Launcher(),
    new Gui(),
    new MinifyCssIdentsPlugin({
      enabled: GUI_MODE === 'build',
      inputMap: resolve.outDir('gui/css/ident-map.json'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': resolve('src') },
  },
  stats: 'errors-only',
  target: 'node',
  watch: serve,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: ['node_modules'],
  },
}
