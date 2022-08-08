// Router for static files
import { static as ExpressStaticRouter } from 'express';
import { Router, resolve } from '@/routers/utils';

export const Static = () => Router((me) => {
  me.use(ExpressStaticRouter(resolve('assets')));
});
