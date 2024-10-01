import { DebugLogRouter } from './DebugLog';
import { FallbackRouter } from './Fallback';
import { GuiRouter } from './Gui';
import { ProxyRouter } from './Proxy';
import { SitemapRouter } from './Sitemap';
import { StaticRouter } from './Static';

export const Routers = {
  DebugLog: DebugLogRouter,
  Fallback: FallbackRouter,
  Gui: GuiRouter,
  Proxy: ProxyRouter,
  Sitemap: SitemapRouter,
  Static: StaticRouter,
};
