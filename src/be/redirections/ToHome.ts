import type { Redirection } from '@/be/middlewares/Redirection';

import { screens } from '@/gui/screens';

export function ToHomeRedirection(): Redirection.Handler {
  return ({ pathname }, { i18n }) => {
    const home = pathname === '/' && screens.Home.route[i18n.lang];
    return home && { pathname: home.pathname };
  };
}
