import { ScrollRestoration, Outlet } from 'react-router-dom';
import { _ } from '@/utils/types';
import { screens } from '@/gui/screens';
import { safeConsole } from '@/utils/safeConsole';
import { Route } from './Route';

const languages = ['mul', 'en', 'fr'] as const;

/** Main router element. */
const element = (
  <>
    {!window && <ScrollRestoration />}
    <Outlet />
  </>
);

/** Pathname usage count (should always be exactly 1). */
const paths: _.Dict<number> = {};

/** App route list made from available screens and their metadata. */
const children = screens
  .map((Screen) =>
    [Screen.route, ...(Screen.subroutes ?? [])].map((locales) =>
      languages.map((language) => {
        const meta = locales?.[language];
        if (meta) {
          const pathnameFr = locales?.fr?.pathname ?? locales?.mul?.pathname ?? meta.pathname;
          const status = pathnameFr === '*' ? 404 : 200;
          const desc = { Screen, language, locales, meta, pathnameFr, status };
          const path = meta.pathname;
          const element = <Route desc={desc} />;
          paths[path] = (paths[path] ?? 0) + 1;
          return { path, element, desc };
        } else {
          return null;
        }
      }),
    ),
  )
  .flat(2)
  .filter(_.isTruthy);

/** Route description. */
export type RouteDesc = (typeof children)[number]['desc'];

/** App routes, intended to be used by `react-router-dom`. */
export const root = { path: '/', element, children };
export const routes = [root];

// Checks each pathname usage count (should always be exactly 1)
for (const [path, count] of Object.entries(paths)) {
  if (!count || count > 1) {
    safeConsole.warn('Registered', count, 'times:', path);
  }
}
