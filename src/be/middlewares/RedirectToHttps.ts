// HTTP server: simple redirect to HTTPS
import type { Request, Response, NextFunction } from 'express';

import { safeConsole } from '@/utils/safeConsole';

export function RedirectToHttpsMiddleware(http: number, https: number) {
  const port = https === 443 ? '' : `:${https}`;
  safeConsole.log(`Use \x1b[32mredirection\x1b[0m from port \x1b[33m${http}\x1b[0m to port \x1b[33m${https}\x1b[0m`);

  return function ({ cookies, headers, protocol, url }: Request, res: Response, next: NextFunction) {
    if (protocol === 'http' && cookies['__forceHttp'] != 'true') {
      const { host = '' } = headers;
      res.redirect(301, `https://${host.replace(/:.*|$/, port)}${url}`);
    } else {
      next();
    }
  };
}
