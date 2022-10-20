import { FallbackRouter } from './Fallback';
import { MainRouter } from './Main';
import { StaticRouter } from './Static';

export { FallbackRouter } from './Fallback';
export { MainRouter } from './Main';
export { StaticRouter } from './Static';

export const Routers = {
  Fallback: FallbackRouter,
  Main: MainRouter,
  Static: StaticRouter,
};

export default Routers;
