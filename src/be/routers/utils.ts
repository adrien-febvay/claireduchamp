import { Router as ExpressRouter } from 'express';
import * as path from 'path';
import { RouterBody } from './types';

export function Router(body: RouterBody) {
  const router = ExpressRouter();
  body(router);
  return router;
}

const ENV_DIR = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
export const resolve = path.resolve.bind(path, ENV_DIR);

export function stringify(val: unknown) {
  const objects: object[] = [];
  const err = val instanceof Error;
  const adjusted = err && { ...val, message: val.message, stack: val.stack };
  return JSON.stringify(
    adjusted || err,
    (_key, value: unknown) => {
      if (value && typeof value === 'object') {
        if (objects.includes(value)) {
          return undefined;
        } else {
          objects.push(value);
        }
      }
      return value;
    },
    2,
  );
}
