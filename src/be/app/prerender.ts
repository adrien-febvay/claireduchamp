/* eslint-disable @typescript-eslint/only-throw-error */
import type { CacheManager } from '@/be/utils/cache';

import { be } from '@/be';
import { root } from '@/gui/support/Router/routes';
import { i18n } from '@/utils/i18n';
import { safeConsole } from '@/utils/safeConsole';

export function prerender(cache: CacheManager) {
  async function prerender() {
    for (const { cache, lang, mobile, pathname } of routes) {
      const headers = { 'cookie': `lang=${lang};`, 'user-agent': mobile ? 'android' : 'desktop' };
      try {
        await fetch(`http://localhost:${be.local.port}${pathname}`, { headers });
        if (!cache.exists) {
          throw 'not saved in cache';
        }
      } catch (error) {
        safeConsole.error('Prerendering failure:', cache.key, error);
      }
    }
  }

  const routes = root.children
    .map(({ desc }) => i18n.supportedLngs.map((lang) => ({ lang, pathname: desc.locales[lang]?.pathname ?? '' })))
    .flat(1)
    .filter((route) => (route.pathname ? !route.pathname.includes(':') : false))
    .concat(i18n.supportedLngs.map((lang) => ({ lang, pathname: '/404' })))
    .map((route) => ['desktop', 'mobile'].map((device, mobile) => ({ ...route, device, mobile })))
    .flat(1)
    .map((route) => ({ ...route, cache: cache.entry(route.device, route.lang, route.pathname) }))
    .filter((route) => !route.cache.exists);

  setTimeout(() => {
    safeConsole.log(`Prerendering \x1b[33m${routes.length}\x1b[0m routes...`);
    prerender()
      .then(() => safeConsole.log('Prerendering complete'))
      .catch((error) => safeConsole.error('Prerendering failure:', error));
  }, 16);
}
