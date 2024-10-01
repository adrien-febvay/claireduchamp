import { appSitemap } from '@/be/app/sitemap';
import { Router } from '@/be/routers/utils';

export const SitemapRouter = () =>
  Router((me) => {
    me.get('/sitemap.xml', (req, res) => {
      const body = appSitemap(req);
      res.setHeader('Content-Type', 'application/xhtml+xml');
      res.status(200);
      res.send(body);
    });
  });
