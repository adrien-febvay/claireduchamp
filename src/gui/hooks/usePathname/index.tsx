import { Context } from '@/gui/support/Router/Context';

import type { pathname } from '@/gui/support/Router/Context';

export function usePathname(): typeof pathname {
  return React.useContext(Context).pathname;
}
