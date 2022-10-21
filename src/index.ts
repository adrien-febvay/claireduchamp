import App from '@/app';

const { https, http } = App.conf;
const port = https || http;
const sslCert = () => App.sslCert('conf', App.conf['ssl-cert']);

if (port) {
  console.log(`Serve app on HTTP${https ? 'S' : ''}, port ${port}`);
}

if (https && http) {
  console.log(`Redirect HTTP from port ${http} to HTTPS on port ${https}`);
  App.http(http, App.redirectTo(https));
  App.https(https, sslCert(), App.main);
} else if (http) {
  App.http(http, App.main);
} else if (https) {
  App.https(https, sslCert(), App.main);
} else {
  throw new Error('No listener set, please configure HTTP or HTTPS');
}
