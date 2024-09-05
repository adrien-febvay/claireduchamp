// HTTP listener
import type { Express } from 'express';
import { ServerWithPort } from '@/be/utils/server-with-port';
import { safeConsole } from '@/utils/safeConsole';

export function appLocal(port: number, app: Express) {
  // Starting the local entry point on specified port
  const server = app.listen(port, () =>
    safeConsole.log(`Serve \x1b[32mlocal\x1b[0m entry point on port \x1b[33m${server.port}\x1b[0m`),
  );
  return ServerWithPort(server);
}
