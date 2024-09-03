const cp = require('child_process');

const npx = /^win\d+$/.test(process.platform) ? 'npx.cmd' : 'npx';

function spawn(cmd, args, options = { stdio: 'inherit' }) {
  // console.log('  ', npx, ...args);
  cp.spawn(cmd, args, { shell: true, ...options });
}

function spawnSync(cmd, args, options = { stdio: 'inherit' }) {
  // console.log('  ', npx, ...args);
  cp.spawnSync(cmd, args, { shell: true, ...options });
}

function run(label, fn, module, env, cmd) {
  console.log(`>> ${label}`, module.toUpperCase());
  env = Object.entries(env).map(([key, value]) => `${key}=${value}`);
  fn(npx, ['cross-env', ...env, ...cmd.filter((chunk) => chunk), '--config', `webpack/${module}.js`]);
}

function build(module, env, label = 'Build') {
  run(label, spawnSync, module, env, ['webpack', env.NODE_ENV === 'production' && '--bail']);
}

function serve(module, env, label = 'Serve') {
  run(label, spawn, module, env, ['webpack-dev-server', '--hot']);
}

module.exports = { build, serve, spawn, spawnSync };
