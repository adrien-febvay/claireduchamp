import type { Express } from 'express';
import type { Server } from 'http';

// Load globals before other imports
import '@/utils/react';
import 'core-js/stable';
import { App } from '@/be/app';

let modules: { app: Express; http?: Server; https?: Server };
const { https: httpsPort, http: httpPort } = App.conf;
const sslCert = App.sslCert();

if (httpPort && httpsPort && sslCert) {
  const app = App.main(httpsPort);
  const http = App.http(httpPort, App.redirectTo(httpPort, httpsPort));
  const https = App.https(httpsPort, sslCert, app);
  modules = { app, http, https };
} else if (httpPort) {
  const app = App.main(httpPort);
  const http = App.http(httpPort, app);
  modules = { app, http };
} else if (httpsPort && sslCert) {
  const app = App.main(httpsPort);
  const https = App.https(httpsPort, sslCert, app);
  modules = { app, https };
} else {
  throw new Error('No valid listener set, please configure http, https and/or ssCert');
}

const local = App.local(App.conf.localPort, modules.app);
export const be = { ...modules, local };
