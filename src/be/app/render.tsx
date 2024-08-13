import StyleContext, { Style } from 'isomorphic-style-loader/StyleContext';
import ReactDOMServer from 'react-dom/server';
import detectMobile from 'is-mobile';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { Head } from '@/gui/support/Head';
import { routes } from '@/gui/support/Router/routes';
import { I18nextProvider } from 'react-i18next';
import { createFetchRequest } from '@/be/utils/misc/create-fetch-request';
import { conf } from '@/conf';

import type { Request, Response } from 'express';

const hydrateScript =
  "<script>hydrate=(d,s)=>{d=document;s=d.createElement('script');s.src='$1';d.head.append(s)}</script>";

// Make GUI configuration available during SSR.
Object.assign(global, { conf: conf.gui });

const ssrOnly = /\bssr-only\b/.test(process.env.BE_MODE ?? '');
if (ssrOnly) {
  console.log('SSR only: GUI main script on hold, type hydrate() in console to execute it');
}

export async function appRender(body: string, req: Request, res: Response) {
  const staticHandler = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req, res);
  const context = await staticHandler.query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server handle that directly
  if (context instanceof Response) {
    throw context;
  }

  /** Client device type. */
  const ua = req.headers['user-agent'];
  const isMobile = !ua || detectMobile({ ua, tablet: true });
  const device = isMobile ? 'mobile' : 'desktop';

  /** Document head context. */
  const host = req.get('host') ?? req.hostname;
  const protocol = `${req.protocol}:`;
  const [hostname = host, port = protocol === 'https:' ? '443' : '80'] = host.split(':', 2);
  const pathname = req.originalUrl.replace(/\?.*/, '');
  const search = req.originalUrl.replace(/[^?]+/, '');
  const href = `${protocol}//${host}${pathname}${search}`;
  const location = { host, hostname, href, pathname, port, protocol, search };
  const headContext = Head.Context.create(location, isMobile);

  // Not the best, but at least the host will be available through a fake location object and should not change.
  Object.assign(global, { location });

  /** CSS stylesheet to add to the document <head>. */
  const styleSet = new Set<Style>();
  function insertCss(...styles: Style[]) {
    for (const style of styles) {
      styleSet.add(style);
    }
  }

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
    .replace(/(?<=<head>\n)/, `    ${head.replace(/(?<=>)(?=<[^/])/g, '\n    ')}\n`)
    .replace(/.*(?=<\/head>)/, '  $&\n  ')
    .replace(/<script defer src="(\/main(\.[a-z\d]+\.min)?.js)"><\/script>/, ssrOnly ? hydrateScript : '$&')
    .replace(/(?<=<div id="app">)(?=<\/div>)/, html)
    .replace(/(?<=<div id="app")(?=>)/, ` class="${device}"`);

  return { content, status: headContext.status ?? 200 };
}
