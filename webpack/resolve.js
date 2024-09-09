const path = require('path');

const resolve = path.resolve.bind(path, __dirname, '..');

resolve.outDir = (module) => resolve(process.env.NODE_ENV === 'production' ? 'dist-prod' : 'dist-dev', module);

module.exports = resolve;
