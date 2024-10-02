import type { Request, Response, NextFunction } from 'express';
import type { _ } from '@/utils/types';

function toUrl({ protocol, host, pathname, query }: Redirection.Location) {
  return `${protocol}://${host}${pathname}${query === '?' ? '' : query}`;
}

export function RedirectionMiddleware(...handlers: Redirection.Handler[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const queryIndex = req.originalUrl.indexOf('?');
    const pathnameLength = queryIndex < 0 ? req.originalUrl.length : queryIndex;
    let location = {
      redirection: 301,
      protocol: req.protocol,
      host: req.headers.host ?? '',
      pathname: req.originalUrl.slice(0, pathnameLength),
      query: req.originalUrl.slice(pathnameLength),
    };
    const originalUrl = toUrl(location);
    for (const handler of handlers) {
      const output = handler?.(location, req);
      if (output) {
        location = {
          redirection: output.redirection || location.redirection,
          protocol: output.protocol || location.protocol,
          host: output.host || location.host,
          pathname: output.pathname || location.pathname,
          query: output.query || location.query,
        };
      }
    }

    const { redirection } = location;
    const newUrl = redirection ? toUrl(location) : '';
    if (redirection && newUrl !== originalUrl) {
      res.redirect(redirection, newUrl);
    } else {
      next();
    }
  };
}

export namespace Redirection {
  export interface Location {
    redirection: number;
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
