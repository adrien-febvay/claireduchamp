// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { conf } from '@/conf';
import { Routers } from '@/be/routers';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { Debug } from './debug';

// Create app
export const appMain = express();
appMain.use(Cookies());
appMain.use(i18nMiddleware());
Debug(appMain);
if (process.env.GUI_MODE === 'serve') {
  appMain.use(Routers.Proxy(conf.devClientPort ?? 3000));
} else {
  appMain.get(/^\/index(\.html?)?$/, (_req, res) => res.redirect(301, '/'));
  appMain.use(Routers.Static());
  appMain.use(Routers.Main());
  appMain.use(Routers.Fallback());
}
