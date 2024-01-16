import { appConf } from './conf';
import { appHttp } from './http';
import { appHttps } from './https';
import { appMain } from './main';
import { appRedirectTo } from './redirect-to';
import { appSslCert } from './ssl-cert';

export const App = {
  conf: appConf,
  http: appHttp,
  https: appHttps,
  main: appMain,
  redirectTo: appRedirectTo,
  sslCert: appSslCert,
};
