// Load globals before other imports
import '@/utils/react';
import 'core-js/stable';
import { App } from '@/be/app';

const { https, http } = App.conf;
const sslCert = App.sslCert();

if (http && https && sslCert) {
  App.https(https, sslCert, App.main(https));
  App.http(http, App.redirectTo(http, https));
} else if (http) {
  App.http(http, App.main(http));
} else if (https && sslCert) {
  App.https(https, sslCert, App.main(https));
} else {
  throw new Error('No valid listener set, please configure http, https and/or ssCert');
}
