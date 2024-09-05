import { conf } from '@/conf';
import { appHttp } from './http';
import { appHttps } from './https';
import { appLocal } from './local';
import { appMain } from './main';
import { appRedirectTo } from './redirect-to';
import { appRender } from './render';
import { appSslCert } from './ssl-cert';

export const App = {
  conf,
  http: appHttp,
  https: appHttps,
  local: appLocal,
  main: appMain,
  redirectTo: appRedirectTo,
  render: appRender,
  sslCert: appSslCert,
};
