// Proxy to UI dev server
import proxy from 'express-http-proxy';

export function ProxyRouter(host: string) {
  console.log('Proxy to:', host);
  return proxy(host, {
    // Must accept self-signed SSL certificates
    proxyReqOptDecorator: (opts) => ({ ...opts, rejectUnauthorized: false }),
  });
}
