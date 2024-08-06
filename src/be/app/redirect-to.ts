// HTTP server: simple redirect to HTTPS
import express from 'express';

export function appRedirectTo(https: number) {
  const app = express();
  const port = https === 443 ? '' : `:${https}`;

  // Redirecting all to https
  app.all('*', ({ headers, url }, res) => {
    const { host = '' } = headers;
    res.redirect(301, `https://${host.replace(/:.*|$/, port)}${url}`);
  });

  return app;
}
