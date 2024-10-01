import { Router as ExpressRouter } from 'express';
import { RouterBody } from './types';

export { resolve } from '@/utils/path';

export function Router(body: RouterBody) {
  const router = ExpressRouter({ strict: true });
  body(router);
  return router;
}

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
