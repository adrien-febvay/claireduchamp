import { ErrorRequestHandler } from 'express';
import { Router } from '@/routers/utils';
import { sendIndex } from './Main';
import { stringify } from './utils';

const NotFound = Router((me) => {
  me.all('*', (_req, res) => {
    res.status(404);
    sendIndex(res);
  });
});

const InternalError: ErrorRequestHandler = (e, req, res, _next) => {
  res.status(500);
  const str = stringify(e);
  const { __debug } = req.cookies;
  if (__debug) {
    res.write(`<!--\n${str.replace(/-(?=\\*->)/g, '-\\')}\n-->`);
  }
  // Todo: log errors here
  try {
    sendIndex(res);
  } catch (e) {
    if (!__debug) {
      res.write('500 Internal Server Error');
    }
    res.end();
  }
};

export const Fallback = () => [NotFound, InternalError];
