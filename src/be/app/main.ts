// HTTP listener
import express from 'express';
import { conf } from '@/conf';
import { Middlewares } from '@/be/middlewares';
import { Routers } from '@/be/routers';
import { Debug } from './debug';

// Create app
export function appMain(port: number) {
  const app = express();
  app.use(Middlewares.RestrictLocal());
  app.use(Middlewares.Cookies());
  app.use(Middlewares.i18n());
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
