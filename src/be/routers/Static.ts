import type { _ } from '@/utils/types';

import { Response, static as ExpressStaticRouter } from 'express';
import { Router, resolve } from '@/be/routers/utils';
import { safeConsole } from '@/utils/safeConsole';

const PATH = resolve('gui');

const contentTypes: _.Dict<string> = {
  eot: 'application/vnd.ms-fontobject',
  ico: 'image/vnd.microsoft.icon',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  map: 'application/json',
  otf: 'font/otf',
  svg: 'image/svg+xml',
  ttf: 'font/ttf',
  txt: 'text/plain',
  xml: 'application/xhtml+xml',
  xsl: 'application/xml',
  woff: 'font/woff',
  woff2: 'font/woff2',
};

function setHeaders(res: Response, path: string): void {
  const pathExt = path.replace(/.*\./, '');
  const contentType = contentTypes[pathExt];
  res.setHeader('Content-Type', contentType ?? 'text/html');
}

export const StaticRouter = () => {
  safeConsole.log(`Serve \x1b[32mstatic\x1b[0m files from \x1b[33m${PATH}\x1b[0m`);
  return Router((me) => {
    me.use(ExpressStaticRouter(PATH, { index: false, setHeaders }));
  });
};
