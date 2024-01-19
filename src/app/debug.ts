import type { Express } from 'express';

import bodyParser from 'body-parser';
import { DebugLogRouter } from '@/routers/DebugLog';

export function Debug(app: Express) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    console.log('Development mode, deploying debug tools');
    // app.use(session({ secret: 'secrets are overrated', saveUninitialized: false }));
    app.use(bodyParser.json());
    app.use(DebugLogRouter);
  } else {
    console.log('Production mode, no debug tools');
  }
}
