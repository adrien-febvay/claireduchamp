// Proxy to UI dev server
import proxy from 'express-http-proxy';
import { appRender } from '@/be/app/render';

export function ProxyRouter(port: number) {
  const host = `localhost:${port}`;
  console.log('Proxy to:', host);
  return proxy(host, {
    // Must accept self-signed SSL certificates
    proxyReqOptDecorator: (opts) => ({ ...opts, rejectUnauthorized: false }),
    userResDecorator: async ({ headers }, proxyResData: Buffer, req, res) => {
      if (req.method === 'GET' && headers['content-type'] === 'text/html; charset=utf-8') {
        const { content, status } = await appRender(proxyResData.toString('utf-8'), req, res);
        res.status(status);
        return content;
      }
      return proxyResData;
    },
  });
}
