// HTTPS listener
import type { Express } from 'express';
import type { SslCert } from './ssl-cert';
import https from 'https';

export function appHttps(port: number, cert: SslCert, app: Express): void {
  // Starting the HTTPS listener on specified port
  const server = https.createServer(cert, app);
  server.listen(port, () => {
    const address = server.address();
    const resolvedPort = address && typeof address === 'object' ? address.port : port;
    console.log(`Serve \x1b[32mhttps\x1b[0m on port \x1b[33m${resolvedPort}\x1b[0m`);
  });
}
