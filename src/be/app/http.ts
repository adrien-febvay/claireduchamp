// HTTP listener
import type { Express } from 'express';

export function appHttp(port: number, app: Express): void {
  // Starting the HTTP listener on specified port
  const server = app.listen(port, () => {
    const address = server.address();
    const resolvedPort = address && typeof address === 'object' ? address.port : port;
    console.log(`Serve \x1b[32mhttp\x1b[0m on port \x1b[33m${resolvedPort}\x1b[0m`);
  });
}
