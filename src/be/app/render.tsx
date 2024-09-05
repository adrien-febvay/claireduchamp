import '@/be/utils/misc/dom-globals';

import StyleContext, { Style } from 'isomorphic-style-loader/StyleContext';
import ReactDOMServer from 'react-dom/server';
import detectMobile from 'is-mobile';
import { encode } from 'html-entities';
import { dirname, resolve } from 'path';
import { I18nextProvider } from 'react-i18next';
import { createFetchRequest } from 'express-create-fetch-request';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { conf } from '@/conf';
import { prerender } from '@/be/app/prerender';
import { CacheManager } from '@/be/utils/cache';
import { Head } from '@/gui/support/Head';
import { routes } from '@/gui/support/Router/routes';
import { classUnion } from '@/utils/dom/classUnion';
import { safeConsole } from '@/utils/safeConsole';

import type { Request, Response } from 'express';

// Make GUI configuration available during SSR.
Object.assign(global, { conf: conf.gui });

/** Script to allow manual GUI hydratation. */
const HYDRATE_TIP = 'SSR only: GUI main script on hold, type hydrate() in console to execute it';
const hydrateScript = `<script>hydrate=(d,s)=>{d=document;s=d.createElement('script');s.src='$1';d.head.append(s)};console.log(${JSON.stringify(HYDRATE_TIP)})</script>`;

/** Cache manager. */
export const cache = new CacheManager(resolve(dirname(process.argv[1] as string), 'cache'));

/** SSR only mode through launcher option. */
const beSsrOnly = /\bssr-only\b/.test(process.env.BE_MODE ?? '');
if (beSsrOnly) {
  safeConsole.log(HYDRATE_TIP);
}

if (beSsrOnly || process.env.GUI_MODE === 'serve') {
  safeConsole.log('Prerendering off');
} else {
  prerender(cache);
}

export async function appRender(body: string, req: Request, res: Response) {
  /** CSS stylesheet to add to the document <head>. */
  const styleSet = new Set<Style>();
  function insertCss(...styles: Style[]) {
    for (const style of styles) {
      styleSet.add(style);
    }
  }

  /** Client device type. */
  const ua = req.headers['user-agent'];
  const isMobile = !ua || detectMobile({ ua, tablet: true });
  const isResponsive = isMobile || req.cookies['__forceResponsive'] === 'true';
  const device = isMobile ? 'mobile' : 'desktop';
  const appClassName = classUnion(device, isResponsive ? 'responsive' : 'not-responsive');

  /** SSR only mode through launcher option or `__ssrOnly=true` cookie option. */
  const ssrOnly = req.cookies['__ssrOnly'] === 'false' ? false : beSsrOnly || req.cookies['__ssrOnly'] === 'true';
  const forceResponsive = req.cookies['__forceResponsive'] === 'true';
  const cacheEnabled = !(ssrOnly || forceResponsive);

  const cacheEntry = cacheEnabled ? cache.entry(device, req.i18n.lang, req.originalUrl) : null;
  const cacheRes = cacheEntry?.get();
  if (cacheRes) {
    return cacheRes;
  } else {
    const staticHandler = createStaticHandler(routes);
    const fetchRequest = createFetchRequest(req, res);
    const context = await staticHandler.query(fetchRequest);

    // If we got a redirect response, short circuit and let our Express server handle that directly
    if (context instanceof Response) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw context;
    }

    /** Document head context. */
    const host = req.get('host') ?? req.hostname;
    const protocol = `${req.protocol}:`;
    const [hostname = host, port = protocol === 'https:' ? '443' : '80'] = host.split(':', 2);
    const pathname = req.originalUrl.replace(/\?.*/, '');
    const search = req.originalUrl.replace(/[^?]+/, '');
    const href = `${protocol}//${host}${pathname}${search}`;
    const location = { host, hostname, href, pathname, port, protocol, search };
    const headContext = Head.Context.create(location, isMobile, isResponsive);

    // Not the best, but at least the host will be available through a fake location object and should not change.
    Object.assign(global, { location });

    /** GUI configuration. */
    const guiConf = `Object.defineProperty(window,'conf',{value:Object.freeze(${JSON.stringify(conf.gui)})});`;

    /** HTML to insert in the #app element. */
    const html = ReactDOMServer.renderToString(
      <React.StrictMode>
        <Head.Context.Provider value={headContext}>
          <StyleContext.Provider value={{ insertCss }}>
            <I18nextProvider i18n={req.i18n}>
              <StaticRouterProvider router={createStaticRouter(staticHandler.dataRoutes, context)} context={context} />
            </I18nextProvider>
          </StyleContext.Provider>
        </Head.Context.Provider>
      </React.StrictMode>,
    );

    /** Document language attributes. */
    const langAttrs = headContext.lang ? ` lang=${headContext.lang} xml:lang=${headContext.lang}` : '';

    /** Document head HTML. */
    const head = ReactDOMServer.renderToStaticMarkup([
      headContext.children,
      <style dangerouslySetInnerHTML={{ __html: [...styleSet].map((style) => style._getCss()).join('') }} />,
      <script dangerouslySetInnerHTML={{ __html: guiConf }} />,
    ]);

    /** Response content. */
    const content = body
      .replace(/(?<=<html[^>])(?=>)/, langAttrs)
      .replace(/(?<=<head>)\n?/, `\n    ${head.replace(/(?<=>)(?=<[^/])/g, '\n    ')}\n`)
      .replace(/.*(?=<\/head>)/, '  $&\n  ')
      .replace(/<script defer src="(\/main(\.[a-z\d]+\.min)?.js)"><\/script>/, ssrOnly ? hydrateScript : '$&')
      .replace(/(?<=<div id="app">)(?=<\/div>)/, html)
      .replace(/(?<=<div id="app")(?=>)/, ` class="${encode(appClassName)}"`);

    const renderedRes = { content, status: headContext.status ?? 200 };

    if (renderedRes.status === 200) {
      cacheEntry?.set(renderedRes);
    } else if (cacheEnabled && renderedRes.status === 404) {
      cache.entry(device, req.i18n.lang, '404').set(renderedRes);
    }

    return renderedRes;
  }
}
