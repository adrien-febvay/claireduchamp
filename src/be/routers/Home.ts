import { Router } from '@/be/routers/utils';
import { Home } from '@/gui/screens/Home';

export const HomeRouter = () =>
  Router((me) => {
    me.get('/', (req, res, next) => {
      const localeRoute = Home.route[req.i18n.lang];
      console.log('/', req.i18n.lang, Object.keys(Home.route), localeRoute?.pathname);
      if (localeRoute) {
        res.redirect(307, localeRoute.pathname);
      } else {
        next();
      }
    });
  });
