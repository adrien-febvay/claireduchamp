const run = require('./run');

const syntax = `
  npm run [mode] [option]

  Mode
    init    Create configuration files from their respective template
    dev     Serves the app in development mode, eventually with partial build
    build   Complete build for the production mode

  Option (development mode only)
    ssr-only    Server side rendering only, static GUI on client side
    build-gui   Serve built GUI instead of proxying its development version
    build-all   Serve built GUI and BE
`.replace(/\n  /g, '\n').slice(1);

const modes = {
  'dev': {
    '': { NODE_ENV: 'development', BE_MODE: 'serve', GUI_MODE: 'serve' },
    'ssr-only': { BE_MODE: 'serve-ssr-only' },
    'build-gui': { GUI_MODE: 'build' },
    'build-all': { BE_MODE: 'build', GUI_MODE: 'build' },
  },
  'build': {
    '': { NODE_ENV: 'production', BE_MODE: 'build', GUI_MODE: 'build' },
  },
}

const args = process.argv.slice(2).filter((arg) => arg && arg !== '--');
const [ mode, ...options] = args;
const envs = modes[mode];
let env = {};

function error(...messages) {
  for (const message of messages) {
    console.error(message)
  }
  process.exit(1);
};

function list(dict) {
  const keys = Object.keys(dict).slice(1);
  const last = keys.pop();
  return `${keys.join(', ')} or ${last}`;
}

function quote(str) {
  return /[^-\w]/.test(str) ? JSON.stringify(str) : str;
}

if (args.includes('help')) {
  if (args.length === 1 || (envs && args.length === 2)) {
    console.log(syntax);
  } else {
    error(syntax);
  }
} else if (!envs) {
  error(
    args.length ? `Invalid mode: ${quote(mode)}` : 'Missing mode',
    `Expected either: ${list(modes)}`,
  );
} else {
  const usedOptions = new Set();
  const envOrigin = {};
  for (const option of options) {
    if (usedOptions.has(option)) {
      error(`Duplicate option: ${quote(option)}`);
    } else if (option in envs) {
      usedOptions.add('option');
      for (const [key, value] of Object.entries(envs[option])) {
        if (key in envOrigin) {
          error(`Conflicting options: ${quote(option)} and ${quote(envOrigin[key])}`);
        } else {
          env[key] = value;
          envOrigin[key] = option;
        }
      }
    } else if (Object.keys(envs).length === 1) {
      error(
        `Unexpected option: ${quote(option)}`,
        `The ${mode} mode does not support any option`,
      );
    } else {
      error(
        `Invalid option: ${quote(option)}`,
        `Available options for ${mode} mode: ${list(envs)}`,
      );
    }
  }
  env = { ...envs[''], ...env };
  process.env.NODE_ENV = env.NODE_ENV;
  console.log(`NODE_ENV=${env.NODE_ENV}`);
  run.build('conf', env, env.NODE_ENV === 'production' ? 'Check' : 'Load');
  if (env.NODE_ENV === 'production') {
    require('../.dist-tmp/conf');
  }
  run.build('be', env, env.BE_MODE === 'build' ? 'Build' : 'Serve');
}
