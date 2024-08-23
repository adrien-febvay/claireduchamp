// Proxy to UI dev server
import proxy from 'express-http-proxy';
import { appRender } from '@/be/app/render';
import { safeConsole } from '@/utils/safeConsole';

export function ProxyRouter(source: number, target: number) {
  safeConsole.log(`Use \x1b[32mproxy\x1b[0m from port \x1b[33m${source}\x1b[0m to port \x1b[33m${target}\x1b[0m`);
  return proxy(`localhost:${target}`, {
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
