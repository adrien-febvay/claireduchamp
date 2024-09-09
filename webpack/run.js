const cp = require('child_process');

function stringifyEnv(env) {
  return Object.entries(env).map(([key, value]) => `${key}=${value}`);
}

function run(fn, cmd, args = [], options = { stdio: 'inherit' }) {
  args = args.filter((arg) => arg);
  // console.log('  ', cmd, ...args);
  fn(cmd, args, { shell: true, ...options });
}

run.npx = function npx(fn, env, args = [], options) {
  fn(/^win\d+$/.test(process.platform) ? 'npx.cmd' : 'npx', ['cross-env', ...stringifyEnv(env), ...args], options);
};

run.npx.spawn = function spawnNpx(env, args, options) {
  run.npx(run.spawn, env, args, options);
};

run.npx.spawn.sync = function spawnNpx(env, args, options) {
  run.npx(run.spawn.sync, env, args, options);
};

run.spawn = function spawn(cmd, args, options) {
  run(cp.spawn, cmd, args, options)
};

run.spawn.sync = function spawnSync(cmd, args, options) {
  run(cp.spawnSync, cmd, args, options)
};

run.webpack = function webpack(label, fn, module, env, args = []) {
  console.log(`>> ${label}`, module.toUpperCase());
  fn(env, [...args, '--config', `webpack/${module}.js`]);
};

run.webpack.build = function webpackBuild(module, env, label = 'Build') {
  run.webpack(label, run.npx.spawn.sync, module, env, ['webpack', env.NODE_ENV === 'production' && '--bail']);
};

run.webpack.serve = function webpackServe(module, env, label = 'Serve') {
  run.webpack(label, run.npx.spawn, module, env, ['webpack-dev-server', '--hot']);
};

module.exports = run;
