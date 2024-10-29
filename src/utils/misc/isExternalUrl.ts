import type { _ } from '@/utils/types';

/** Regular expression mathing an external URL and extracting its hostname. */
export const externalUrl = /^(?:(?:https?|ftp):|\/\/)\/*([^:/\s]+)/;

/**
 * Checks if a URL is external.
 * @param url URL to check.
 * @returns A boolean accordingly.
 */
export function isExternalUrl(url: _.Optional<string>): boolean {
  const host = url && externalUrl.exec(url);
  return host ? host[1] !== location?.host : false;
}
