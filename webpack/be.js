/* global process */
const cp = require('child_process');
const ShellPlugin = require('webpack-shell-plugin-next');
const resolve = require('./resolve');
const run = require('./run');

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
        run.build('gui', env);
      } else {
        compiler.hooks.afterEmit.tap('Gui.emit', runOnce(() => void run.serve('gui', env)));
      }
  });
}

class Launcher {
  apply = runOnce((compiler) => {
    compiler.hooks.afterEmit.tap('Launcher.emitOnce', runOnce(() => {
      if (serve) {
        const npx = /^win\d+$/.test(process.platform) ? 'npx.cmd' : 'npx';
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, starting...\n');
        run.spawn(npx, ['nodemon', '.dist-tmp/be', '--quiet', '--watch', '.dist-tmp/be']);
        process.stdout.write('Type \x1b[32;1mrs\x1b[0m and hit enter to manually restart BE\n');
        compiler.hooks.watchRun.tap('Launcher.update', () => process.stdout.write('\n>> \x1b[32mChange detected!\x1b[0m Updating BE...\n'))
        compiler.hooks.afterEmit.tap('Launcher.emitAgain', () => process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, restarting...\n'));
      } else if (dev) {
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully, starting...\n');
        run.spawnSync('node', ['.dist-tmp/be']);
      } else {
        process.stdout.write('>> \x1b[32mDone!\x1b[0m BE compiled successfully\n');
      }
    }));
  });
}

module.exports = {
  entry: './src/be/index.ts',
  externals: [require('webpack-node-externals')({
    allowlist: [/\.css$/],
  })],
  mode: NODE_ENV,
  module: {
    rules: require('./loaders')(['isomorphic-style-loader'], {
      esModule: false,
      modules: {
        localIdentContext: resolve('src/gui'),
      },
    }),
  },
  node: { __dirname: true },
  optimization: { minimize: false },
  output: {
    path: resolve('.dist-tmp/be'),
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new Launcher(),
    new Gui(),
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
