const path = require('path');

const resolve = path.resolve.bind(path, __dirname, '..');

resolve.outDir = (module) => resolve(process.env.NODE_ENV === 'production' ? 'dist-prod-tmp' : 'dist-dev', module);

module.exports = resolve;
