const { spawn, spawnSync } = require('child_process');

const npx = /^win\d+$/.test(process.platform) ? 'npx.cmd' : 'npx';

function run(label, fn, module, env, cmd) {
  console.log(`>> ${label}`, module.toUpperCase());
  env = Object.entries(env).map(([key, value]) => `${key}=${value}`);
  fn(npx, ['cross-env', ...env, ...cmd.filter((chunk) => chunk), '--config', `webpack/${module}.js`], { stdio: 'inherit' });
}

function build(module, env, label = 'Build') {
  run(label, spawnSync, module, env, ['webpack', env.NODE_ENV === 'production' && '--bail']);
}

function serve(module, env, label = 'Serve') {
  run(label, spawn, module, env, ['webpack-dev-server', '--hot']);
}

module.exports = { build, serve };
