const path = require('path');

const resolve = path.resolve.bind(path, __dirname, '..');

resolve.outDir = (module, ...path) => resolve(process.env.NODE_ENV === 'production' ? 'dist-prod-tmp' : 'dist-dev', module, ...path);

resolve.srcDir = (module, ...path) => resolve('src', module, ...path);

module.exports = resolve;
