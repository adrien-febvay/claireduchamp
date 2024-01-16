import { static as ExpressStaticRouter } from 'express';
import { Router, resolve } from '@/routers/utils';

export const StaticRouter = () =>
  Router((me) => {
    me.use(ExpressStaticRouter(resolve('assets')));
  });
