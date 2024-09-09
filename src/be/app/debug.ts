import type { Express } from 'express';

import bodyParser from 'body-parser';
import { DebugLogRouter } from '@/be/routers/DebugLog';
import { safeConsole } from '@/utils/safeConsole';

export function Debug(app: Express) {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development' || NODE_ENV === 'staging') {
    safeConsole.log('Development mode, deploying debug tools');
    app.use(bodyParser.json());
    app.use(DebugLogRouter);
  } else {
    const mode = NODE_ENV === 'prerender' ? 'Prerender' : 'Production';
    safeConsole.log(`${mode} mode, no debug tools`);
  }
}
