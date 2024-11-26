import type { _ } from '@/utils/types';

import { Context } from '@/gui/support/Router/Context';

export function useRouterContext<Params extends object = _.Dict>(): Context<Params>;
export function useRouterContext() {
  return React.useContext(Context);
}
