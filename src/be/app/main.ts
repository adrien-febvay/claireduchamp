// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { conf } from '@/conf';
import { Routers } from '@/be/routers';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { Debug } from './debug';

// Create app
export function appMain(port: number) {
  const app = express();
  app.use(Cookies());
  app.use(i18nMiddleware());
  Debug(app);
  app.use(Routers.IndexRedirection());
  app.use(Routers.Home());
  if (process.env.GUI_MODE === 'serve') {
    app.use(Routers.Proxy(port, conf.devGuiPort));
  } else {
    app.use(Routers.Static());
    app.use(Routers.Gui());
    app.use(Routers.Fallback());
  }
  return app;
}
