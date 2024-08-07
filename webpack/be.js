/* global process */
const ShellPlugin = require('webpack-shell-plugin-next');
const resolve = require('./resolve');
const run = require('./run');

const { NODE_ENV, BE_MODE, GUI_MODE } = process.env;
const env = { NODE_ENV, BE_MODE, GUI_MODE };
const dev = NODE_ENV === 'development';
const serve = /^serve\b/.test(BE_MODE);

class Gui {
  apply(compiler) {
    const npm = /^win\d+$/.test(process.platform) ? 'npm.cmd' : 'npm';
    if (GUI_MODE === 'build') {
      run.build('gui', env);
    } else if (!Gui.isTapped) {
      compiler.hooks.afterPlugins.tap('Client', () => void run.serve('gui', env));
      Gui.isTapped = true;
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
    rules: require('./loaders')(['isomorphic-style-loader'], {
      esModule: false,
      modules: {
        localIdentContext: resolve('src/gui'),
      },
    }),
  },
  node: { __dirname: true },
  output: {
    path: resolve('.dist-tmp/be'),
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new Gui(),
    new ShellPlugin({
      onBuildEnd: serve ? {
        env,
        parallel: true,
        scripts: ['nodemon .dist-tmp/be/index.js --watch .dist-tmp/be'],
      } : dev && {
        env,
        scripts: ['node .dist-tmp/be/index.js'],
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': resolve('src') },
  },
  stats: 'minimal',
  target: 'node',
  watch: serve,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: ['node_modules'],
  },
}
