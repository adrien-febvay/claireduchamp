const { spawn, spawnSync } = require('child_process');

const npx = /^win\d+$/.test(process.platform) ? 'npx.cmd' : 'npx';

function run(fn, env, cmd) {
  env = Object.entries(env).map(([key, value]) => `${key}=${value}`);
  fn(npx, ['cross-env', ...env, ...cmd.filter((chunk) => chunk)], { stdio: 'inherit' });
}

function build(module, env, label = 'Build') {
  console.log(`>> ${label}`, module.toUpperCase());
  run(spawnSync, env, ['webpack', env.NODE_ENV === 'production' && '--bail', '--config', `webpack/${module}.js`]);
}

function serve(module, env) {
  console.log('>> Serve', module.toUpperCase());
  run(spawn, env, ['webpack-dev-server', '--hot', '--config', `webpack/${module}.js`]);
}

module.exports = { build, serve };
