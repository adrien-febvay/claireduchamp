// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { appConf } from '@/app/conf';
import { Routers } from '@/routers';
import { INDEX_FILE } from '@/routers/Main';
import { Debug } from './debug';

// Create app
export const appMain = express();
appMain.use(Cookies());
Debug(appMain);
if (appConf.proxy) {
  appMain.use(Routers.Proxy(appConf.proxy));
} else {
  appMain.use(`/${INDEX_FILE}`, Routers.Main());
  appMain.use(Routers.Static());
  appMain.use(Routers.Main());
  appMain.use(Routers.Fallback());
}
