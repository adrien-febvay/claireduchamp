/* eslint-disable @typescript-eslint/only-throw-error */
import type { CacheManager } from '@/be/utils/cache';

import { be } from '@/be';
import { conf } from '@/conf';
import { sitemapEmitter } from '@/be/app/sitemap';
import { root } from '@/gui/support/Router/routes';
import { i18n } from '@/utils/i18n';
import { safeConsole } from '@/utils/safeConsole';

function bold(text: number | string) {
  return `\x1b[33m${text}\x1b[0m`;
}

export function prerender(cache: CacheManager) {
  async function prerender() {
    let count = 0;
    let time = Number(new Date());
    for (const { cache, lang, mobile, path } of routesToPrerender) {
      const langCookie = lang ? `lang=${lang}; ` : '';
      const cookie = `${langCookie}__forceHttp=true;__forceHost=${conf.host}`;
      const headers = { cookie, 'user-agent': mobile ? 'android' : 'desktop' };
      try {
        await fetch(`http://localhost:${be.http.port}${path}`, { headers });
        if (cache && !cache.exists) {
          throw 'not saved in cache';
        }
      } catch (error) {
        safeConsole.error('Prerendering failure:', cache?.key ?? path, error);
      } finally {
        count += 1;
        const newtime = Number(new Date());
        if (newtime >= time + 3e3) {
          time = newtime;
          const plural = count > 1 ? 's' : '';
          const total = routesToPrerender.length;
          safeConsole.log(`Prerendered ${bold(count)} route${plural} out of ${bold(total)}`);
        }
      }
    }
  }

  const allRoutes = root.children
    .map(({ path, desc }) => ({ path: path.replace(/\/:\w+\?/g, ''), lang: desc.language }))
    .filter(({ path, lang }) => !/:/.test(path) && lang !== 'mul')
    .concat(i18n.supportedLngs.map((lang) => ({ path: '/404', lang })))
    .map((route) => ['desktop', 'mobile'].map((device, mobile) => ({ ...route, device, mobile })))
    .flat(1)
    .map((route) => ({ ...route, cache: cache.entry(route.device, route.lang, route.path) }));

  const allRoutesAndSitemap = [{ cache: null, lang: null, mobile: null, path: '/sitemap.xml' }, ...allRoutes];

  const routesToPrerender = allRoutesAndSitemap.filter((route) => !route.cache?.exists);

  const keys = new Set(routesToPrerender.map(({ cache, path }) => cache?.key ?? path));
  function cached(key: string) {
    keys.delete(key);
    if (!keys.size) {
      safeConsole.log('Prerendering complete');
      cache.off('set', cached);
      sitemapEmitter.off('set', cached);
      if (process.env.PRERENDER === 'true') {
        process.exit(0);
      }
    }
  }
  cache.on('set', cached);
  sitemapEmitter.on('set', cached);

  if (routesToPrerender.length) {
    setTimeout(() => {
      safeConsole.log(`Prerendering ${bold(routesToPrerender.length)} routes for ${bold(conf.host)}...`);
      if (routesToPrerender.length !== allRoutesAndSitemap.length) {
        const routes = routesToPrerender.map((route) => {
          const lang = route.lang ? `/${route.lang}` : '';
          const device = route.mobile ? '/mobile' : route.mobile === 0 ? '/desktop' : '';
          const dir = route.cache ? `cache${lang}${device}` : 'gui';
          return `  ${dir}${bold(route.path)}`;
        });
        safeConsole.log(routes.join('\n'));
      }
      prerender().catch((error) => {
        safeConsole.error('Prerendering failure:', error);
        cache.off('set', cached);
        if (process.env.PRERENDER === 'true') {
          process.exit(500);
        }
      });
    }, 16);
  } else {
    safeConsole.log(`All ${bold(allRoutes.length)} routes already in cache, nothing to prerender...`);
  }
}
