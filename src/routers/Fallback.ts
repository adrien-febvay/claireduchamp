import { ErrorRequestHandler, Request } from 'express';
import { Router } from '@/routers/utils';
import { _ } from '@/utils/types';
import { INDEX_PATH, sendIndex } from './Main';
import { stringify } from './utils';

const NotFound = Router((me) => {
  me.all('*', (_req, res) => {
    res.status(404);
    sendIndex(res);
  });
});

function log(label: string, { cookies, res }: Request, e?: unknown) {
  const debug = _.object(cookies as unknown)?.__debug;
  // Todo: log errors in file here
  if (debug) {
    const title = `Fallback.${label}:`;
    const str = `${title} ${stringify(e)}`;
    const escaped = str.replace(/-(?=\\*->)/g, '-\\');
    res?.write?.(`<!--\n${escaped}\n-->`);
    console.error(title, _.object(e)?.message || e);
  }
  return debug;
}

const InternalError: ErrorRequestHandler = (e: unknown, req, res, next) => {
  res.status(500);
  if (_.isObject(e) && (e.code === 'ENOENT' || e.path === INDEX_PATH)) {
    next(e);
  } else {
    log('main', req, e);
    sendIndex(res);
  }
};

const IndexError: ErrorRequestHandler = (e, req, res, _next) => {
  if (!log('no-index', req, e)) {
    res.write('500 Internal Server Error');
  }
  res.end();
};

export const FallbackRouter = () => [NotFound, InternalError, IndexError];
