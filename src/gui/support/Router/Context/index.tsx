import type { _ } from '@/utils/types';
import type { RouteDesc } from '../routes';
import type { Screen } from '@/gui/screens';

/** Current and previous pathname. */
export const pathname = {
  curr: null as string | null,
  prev: null as string | null,
};

const initValue = {
  /** Current screen. */
  Screen: {} as Screen,
  /** Current route locales. */
  locales: {} as RouteDesc['locales'],
  /** Current route parameters. */
  params: {} as _.Dict<string>,
  /** URL pathname. */
  pathname,
};

type Filter<Params extends object> = {
  [Key in Extract<keyof Params, string>]: Params[Key] extends string | undefined ? Params[Key] : never;
};

/** Router context. */
export const Support_Router_Context = React.createContext(initValue);

export type Support_Router_Context<Params extends object = _.Dict> = Omit<typeof initValue, 'params'> & {
  params: Filter<Params>;
};

export const Context = Support_Router_Context;

export type Context<Params extends object = _.Dict> = Support_Router_Context<Params>;
