import { Router } from '@/be/routers/utils';
import { Home } from '@/gui/screens/Home';

export const HomeRouter = () =>
  Router((me) => {
    me.get('/', (req, res, next) => {
      const localeRoute = Home.route[req.i18n.lang];
      if (localeRoute) {
        res.redirect(307, localeRoute.pathname);
      } else {
        next();
      }
    });
  });
