import type { Express } from 'express';

import bodyParser from 'body-parser';
import { DebugLogRouter } from '@/be/routers/DebugLog';
import { safeConsole } from '@/utils/safeConsole';

export function Debug(app: Express) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    safeConsole.log('Development mode, deploying debug tools');
    // app.use(session({ secret: 'secrets are overrated', saveUninitialized: false }));
    app.use(bodyParser.json());
    app.use(DebugLogRouter);
  } else {
    safeConsole.log('Production mode, no debug tools');
  }
}
