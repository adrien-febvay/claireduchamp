import type { Article } from '../Article';

import { articles } from '@/gui/locales/blog';
import { safeConsole } from '@/utils/safeConsole';

/** Project routes. */
export const routes = {} as Routes;

const ids = Object.keys(articles) as Article.Id[];

for (const id of ids) {
  routes[id] = { fr: articles[id] };
  if (!/[a-z][a-z0-9]*([A-Z][a-z0-9]*|[0-9]+)*/.test(id)) {
    safeConsole.warn('Bad project ID:', JSON.stringify(id), routes[id]);
  }
}
