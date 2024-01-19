import { DebugLogRouter } from './DebugLog';
import { FallbackRouter } from './Fallback';
import { MainRouter } from './Main';
import { ProxyRouter } from './Proxy';
import { StaticRouter } from './Static';

export const Routers = {
  DebugLog: DebugLogRouter,
  Fallback: FallbackRouter,
  Main: MainRouter,
  Proxy: ProxyRouter,
  Static: StaticRouter,
};
