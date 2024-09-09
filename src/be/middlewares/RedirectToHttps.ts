// HTTP server: simple redirect to HTTPS
import type { Server } from 'http';
import type { RequestHandler } from 'express';

import { be } from '@/be';
import { safeConsole } from '@/utils/safeConsole';

export function RedirectToHttpsMiddleware(http: number, https: number): RequestHandler {
  const port = https === 443 ? '' : `:${https}`;
  safeConsole.log(`Use \x1b[32mredirection\x1b[0m from port \x1b[33m${http}\x1b[0m to port \x1b[33m${https}\x1b[0m`);

  return function (this: Server, { headers, socket, url }, res, next) {
    if (this === be.http && this.address() !== (socket.remoteAddress || headers['x-forwarded-for'])) {
      const { host = '' } = headers;
      res.redirect(301, `https://${host.replace(/:.*|$/, port)}${url}`);
    } else {
      next();
    }
  };
}
