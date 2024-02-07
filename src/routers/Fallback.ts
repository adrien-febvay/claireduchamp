import { ErrorRequestHandler, Request } from 'express';
import { _ } from '@/utils/types';
import { indexPath, sendIndex } from './Main';
import { stringify } from './utils';

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
  if (_.isObject(e) && (e.code === 'ENOENT' || e.path === indexPath)) {
    next(e);
  } else {
    log('main', req, e);
    sendIndex(res);
  }
};

const IndexError: ErrorRequestHandler = (e, req, res, _next) => {
  if (!log('no-index', req, e)) {
    res.setHeader('Content-Type', 'text/pain');
    res.write('500 Internal Server Error');
  }
  res.end();
};

export const FallbackRouter = () => [InternalError, IndexError];
