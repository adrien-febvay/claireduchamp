import type { _ } from '@/utils/types';
import type { RouteDesc } from '../routes';

/** Current and previous pathname. */
export const pathname = {
  curr: null as string | null,
  prev: null as string | null,
};

/** Router context. */
export const Support_Router_Context = React.createContext({
  /** Current route locales. */
  locales: {} as RouteDesc['locales'],
  /** Current route parameters. */
  params: {} as _.Dict<string>,
  /** URL pathname. */
  pathname,
});

export const Context = Support_Router_Context;
