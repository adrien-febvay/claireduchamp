import { Router } from '@/be/routers/utils';

export const IndexRedirectionRouter = () =>
  Router((me) => {
    me.get(/(.*\/)index\.html?$/, (req, res) => {
      res.redirect(301, req.params[0] ?? '/');
    });
  });
