import type { Request, Response, NextFunction } from 'express';
import type { _ } from '@/utils/types';

export function RedirectionMiddleware(...handlers: Redirection.Handler[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const queryIndex = req.originalUrl.indexOf('?');
    const pathnameLength = queryIndex < 0 ? req.originalUrl.length : queryIndex;
    const location = {
      redirection: null,
      protocol: req.protocol,
      host: req.headers.host ?? '',
      pathname: req.originalUrl.slice(0, pathnameLength),
      query: req.originalUrl.slice(pathnameLength),
    };
    for (const handler of handlers) {
      const output = handler?.(location, req);
      if (output) {
        Object.assign(location, output, { redirection: output.redirection || 301 });
      }
    }
    const { redirection, protocol, host, pathname, query } = location;
    if (redirection) {
      res.redirect(redirection, `${protocol}://${host}${pathname}${query}`);
    } else {
      next();
    }
  };
}

export namespace Redirection {
  export interface Location {
    redirection: number | null;
    protocol: string;
    host: string;
    pathname: string;
    query: string;
  }

  export namespace Location {
    export type Input = Readonly<Location>;

    export type Output = _.Optional<Partial<Location>>;
  }

  export type Handler = _.Nullish<(location: Location.Input, request: Request) => Location.Output>;
}
