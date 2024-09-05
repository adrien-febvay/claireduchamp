// HTTPS listener
import type { Express } from 'express';
import type { SslCert } from './ssl-cert';

import https from 'https';
import { ServerWithPort } from '@/be/utils/server-with-port';
import { safeConsole } from '@/utils/safeConsole';

export function appHttps(port: number, cert: SslCert, app: Express) {
  // Starting the HTTPS listener on specified port
  const server = https.createServer(cert, app);
  server.listen(port, () => safeConsole.log(`Serve \x1b[32mhttps\x1b[0m on port \x1b[33m${server.port}\x1b[0m`));
  return ServerWithPort(server);
}
