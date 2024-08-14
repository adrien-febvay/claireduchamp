// HTTP server: simple redirect to HTTPS
import express from 'express';

export function appRedirectTo(http: number, https: number) {
  const app = express();
  const port = https === 443 ? '' : `:${https}`;
  console.log(`Use \x1b[32mredirection\x1b[0m from port \x1b[33m${http}\x1b[0m to port \x1b[33m${https}\x1b[0m`);

  // Redirecting all to https
  app.all('*', ({ headers, url }, res) => {
    const { host = '' } = headers;
    res.redirect(301, `https://${host.replace(/:.*|$/, port)}${url}`);
  });

  return app;
}
