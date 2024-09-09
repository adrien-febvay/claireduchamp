import type { Express } from 'express';
import type { Server } from 'http';

// Load globals before other imports
import '@/utils/react';
import 'core-js/stable';
import { App } from '@/be/app';

let modules: { app: Express; http: Server; https?: Server };
const { https: httpsPort, http: httpPort } = App.conf;
const prerender = process.env.PRERENDER === 'true';

if (!prerender && httpsPort) {
  const app = App.main(httpPort, httpsPort);
  const http = App.http(httpPort, app);
  const https = App.https(httpsPort, app);
  modules = { app, http, https };
} else {
  const app = App.main(httpPort);
  const http = App.http(httpPort, app);
  modules = { app, http };
}

export const be = modules;
