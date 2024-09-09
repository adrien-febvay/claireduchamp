import { conf } from '@/conf';
import { appHttp } from './http';
import { appHttps } from './https';
import { appMain } from './main';
import { appRender } from './render';
import { appSslCert } from './ssl-cert';

export const App = {
  conf,
  http: appHttp,
  https: appHttps,
  main: appMain,
  render: appRender,
  sslCert: appSslCert,
};
