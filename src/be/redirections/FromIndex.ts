import type { Redirection } from '@/be/middlewares/Redirection';

export function FromIndexRedirection(): Redirection.Handler {
  return ({ pathname }) => {
    const match = /(.*\/)index\.html?$/.exec(pathname);
    return match && { pathname: match[1] };
  };
}
