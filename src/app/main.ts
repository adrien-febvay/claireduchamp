// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { appConf } from '@/app/conf';
import { Routers } from '@/routers';

// Create app
export const appMain = express();
appMain.use(Cookies());
if (appConf.proxy) {
  appMain.use(Routers.Proxy(appConf.proxy));
} else {
  appMain.use(Routers.Static());
  appMain.use(Routers.Main());
  appMain.use(Routers.Fallback());
}
