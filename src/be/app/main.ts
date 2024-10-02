// HTTP listener
import express from 'express';
import { conf } from '@/conf';
import { Middlewares } from '@/be/middlewares';
import { Redirections } from '@/be/redirections';
import { Routers } from '@/be/routers';
import { Debug } from './debug';

// Create app
export function appMain(http: number, https?: number) {
  const app = express();
  app.use(Middlewares.Cookies());
  app.use(Middlewares.i18n());
  app.use(
    Middlewares.Redirection(
      https ? Redirections.ToHttps(http, https) : null,
      Redirections.FromIndex(),
      Redirections.ToHome(),
      Redirections.Updates(),
    ),
  );
  Debug(app);
  if (process.env.GUI_MODE === 'serve') {
    app.use(Routers.Sitemap());
    app.use(Routers.Proxy(https ?? http, conf.devGuiPort));
  } else {
    app.use(Routers.Static());
    app.use(Routers.Sitemap());
    app.use(Routers.Gui());
    app.use(Routers.Fallback());
  }
  return app;
}
