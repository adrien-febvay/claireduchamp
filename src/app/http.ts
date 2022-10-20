// HTTP listener
import type { Express } from 'express';

export function appHttp(port: number, app: Express): void {
  // Starting the HTTP listener on specified port
  const server = app.listen(port, () => {
    console.log('HTTP:', server.address());
  });
};
