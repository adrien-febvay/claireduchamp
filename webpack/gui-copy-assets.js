const CopyPlugin = require('copy-webpack-plugin');
const readdirSync = require('fs').readdirSync;
const resolve = require('./resolve');

module.exports = class CopyAssetsPlugin extends CopyPlugin {
  constructor() {
    const assets = readdirSync(resolve('src/gui/assets')).filter((el) => el !== 'scss' && el !== 'svg');
    const patterns = assets.map((el) => ({ from: `assets/${el}`, to: el }));
    super({ patterns });
  }
};
