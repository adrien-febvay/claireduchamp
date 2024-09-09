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
    for (const { cache, lang, mobile, path } of routes) {
      const headers = { 'cookie': `lang=${lang};`, 'user-agent': mobile ? 'android' : 'desktop' };
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
          safeConsole.log(`Prerendered \x1b[33m${count}\x1b[0m route${plural} out of \x1b[33m${routes.length}\x1b[0m`);
        }
      }
    }
  }

  const routes = root.children
    .map(({ path, desc }) => ({ path: path.replace(/\/:\w+\?/g, ''), lang: desc.language }))
    .filter(({ path, lang }) => !/:/.test(path) && lang !== 'mul')
    .concat(i18n.supportedLngs.map((lang) => ({ path: '/404', lang })))
    .map((route) => ['desktop', 'mobile'].map((device, mobile) => ({ ...route, device, mobile })))
    .flat(1)
    .map((route) => ({ ...route, cache: cache.entry(route.device, route.lang, route.path) }))
    .filter((route) => !route.cache.exists);

  setTimeout(() => {
    safeConsole.log(`Prerendering \x1b[33m${routes.length}\x1b[0m routes...`);
    prerender()
      .then(() => {
        safeConsole.log('Prerendering complete');
        if (process.env.PRERENDER === 'true') {
          process.exit(0);
        }
      })
      .catch((error) => {
        safeConsole.error('Prerendering failure:', error);
        if (process.env.PRERENDER === 'true') {
          process.exit(500);
        }
      });
  }, 16);
}
