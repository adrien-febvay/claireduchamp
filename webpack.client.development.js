var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf/development.json', 'utf8'));

module.exports = {
  devServer: {
    historyApiFallback: { disableDotRule: true },
    host: '::1',
    allowedHosts: "all",
    port: conf?.devClientPort ?? 3000,
  },
  output: {
    filename: '[name].js',
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: ['node_modules', 'dist'],
  },
};
