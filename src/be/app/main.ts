// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { appConf } from '@/be/app/conf';
import { Routers } from '@/be/routers';
import { INDEX_FILE } from '@/be/routers/Main';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { Debug } from './debug';

// Create app
export const appMain = express();
appMain.use(Cookies());
appMain.use(i18nMiddleware());
Debug(appMain);
if (appConf.devClientPort) {
  appMain.use(Routers.Proxy(appConf.devClientPort));
} else {
  appMain.use(`/${INDEX_FILE}`, Routers.Main());
  appMain.use(Routers.Static());
  appMain.use(Routers.Main());
  appMain.use(Routers.Fallback());
}
