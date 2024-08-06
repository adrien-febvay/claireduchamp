import type { _ } from '@/utils/types';

export function applyParamsToUrl(url: string, params?: _.Optional<_.Dict<string>>): string {
  return url.replace(/(^|\/):[^/]*\??(?=\/|$)/g, (match) => {
    const slash = match[0] === '/' ? '/' : '';
    const optional = match.slice(-1) === '?';
    const name = match.slice(slash ? 2 : 1, optional ? -1 : void 0);
    const value = params ? params[name] : null;
    return value == null ? (optional ? '' : slash) : `${slash}${value}`;
  });
}
