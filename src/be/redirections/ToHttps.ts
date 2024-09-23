// HTTP server: simple redirect to HTTPS
import type { Redirection } from '@/be/middlewares/Redirection';

import { safeConsole } from '@/utils/safeConsole';

export function ToHttpsRedirection(http: number, https: number): Redirection.Handler {
  const port = https === 443 ? '' : `:${https}`;
  safeConsole.log(`Use \x1b[32mredirection\x1b[0m from port \x1b[33m${http}\x1b[0m to port \x1b[33m${https}\x1b[0m`);

  return ({ protocol, host }, { cookies }) => {
    const redirect = protocol === 'http' && cookies['__forceHttp'] != 'true';
    return redirect && { protocol: 'https', host: host.replace(/:.*|$/, port) };
  };
}
