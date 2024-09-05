import type { Request, Response, NextFunction } from 'express';
import type { Server } from 'http';

import { be } from '@/be';

export function RestrictLocalMiddleware() {
  return function (this: Server, req: Request, res: Response, next: NextFunction) {
    if (this === be.local) {
      const reqAddress = req.socket.remoteAddress || req.headers['x-forwarded-for'];
      if (this.address() !== reqAddress) {
        res.status(403);
        res.send('Forbidden');
      }
    }
    next();
  };
}
