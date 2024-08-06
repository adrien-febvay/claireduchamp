// HTTPS listener
import type { Express } from 'express';
import type { SslCert } from './ssl-cert';
import https from 'https';

export function appHttps(port: number, cert: SslCert, app: Express): void {
  // Starting the HTTPS listener on specified port
  const server = https.createServer(cert, app);
  server.listen(port, () => {
    console.log('HTTPS:', server.address());
  });
}
