/* eslint-disable @typescript-eslint/only-throw-error */
import type { CacheManager } from '@/be/utils/cache';

import { be } from '@/be';
import { root } from '@/gui/support/Router/routes';
import { i18n } from '@/utils/i18n';
import { safeConsole } from '@/utils/safeConsole';

export function prerender(cache: CacheManager) {
  async function prerender() {
    let count = 0;
    let time = Number(new Date());
    for (const { cache, lang, mobile, path } of routesToPrerender) {
      const headers = { 'cookie': `lang=${lang}; __forceHttp=true;`, 'user-agent': mobile ? 'android' : 'desktop' };
      try {
        await fetch(`http://localhost:${be.http.port}${path}`, { headers });
        if (!cache.exists) {
          throw 'not saved in cache';
        }
      } catch (error) {
        safeConsole.error('Prerendering failure:', cache.key, error);
      } finally {
        count += 1;
        const newtime = Number(new Date());
        if (newtime >= time + 3e3) {
          time = newtime;
          const plural = count > 1 ? 's' : '';
          const total = routesToPrerender.length;
          safeConsole.log(`Prerendered \x1b[33m${count}\x1b[0m route${plural} out of \x1b[33m${total}\x1b[0m`);
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

  const routesToPrerender = allRoutes.filter((route) => !route.cache.exists);

  const keys = new Set(routesToPrerender.map(({ cache }) => cache.key));
  function cached(key: string) {
    keys.delete(key);
    if (!keys.size) {
      safeConsole.log('Prerendering complete');
      cache.off('set', cached);
      if (process.env.PRERENDER === 'true') {
        process.exit(0);
      }
    }
  }
  cache.on('set', cached);

  if (routesToPrerender.length) {
    setTimeout(() => {
      safeConsole.log(`Prerendering \x1b[33m${routesToPrerender.length}\x1b[0m routes...`);
      prerender().catch((error) => {
        safeConsole.error('Prerendering failure:', error);
        cache.off('set', cached);
        if (process.env.PRERENDER === 'true') {
          process.exit(500);
        }
      });
    }, 16);
  } else {
    safeConsole.log(`All \x1b[33m${allRoutes.length}\x1b[0m routes already in cache, nothing to prerender...`);
  }
}
