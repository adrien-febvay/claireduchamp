// Load globals before other imports
import '@/utils/react';
import 'core-js/stable';
import { App } from '@/be/app';

const { https, http } = App.conf;
const port = https || http;
const sslCert = App.sslCert();

if (port) {
  console.log(`Serve app on HTTP${https && sslCert ? 'S' : ''}, port ${port}`);
}

if (http && https && sslCert) {
  console.log(`Redirect HTTP from port ${http} to HTTPS on port ${https}`);
  App.http(http, App.redirectTo(https));
  App.https(https, sslCert, App.main);
} else if (http) {
  App.http(http, App.main);
} else if (https && sslCert) {
  App.https(https, sslCert, App.main);
} else {
  throw new Error('No valid listener set, please configure http, https and/or ssCert');
}
