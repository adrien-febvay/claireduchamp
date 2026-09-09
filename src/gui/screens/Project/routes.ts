import type { Project } from '.';

import { _ } from '@/utils/types';
import { route } from '@/gui/screens/route';
import { safeConsole } from '@/utils/safeConsole';
import { projects } from './projects';

function meta<Id extends Project.Id>(locales: Project.Data, id: Id): Project.Data[Id];

function meta(locales: Project.Data, id: Project.Data.Id): Project.Data[Project.Id] | null;

function meta(locales: Project.Data, id: Project.Data.Id): Meta | null {
  const meta = locales[id];
  const pathname = meta.pathname && `${meta.pathname}/:photo?`;
  const params = { id };
  if (pathname && route.isMeta(meta)) {
    const { caption, description: stdDescription, seoDescription } = meta;
    const description = seoDescription ?? ([caption, stdDescription].filter(Boolean).join(' – ') || undefined);
    return { ...meta, description, pathname, params };
  } else {
    return null;
  }
}

/** Project routes. */
export const routes = {} as Routes;

const ids = Object.keys({
  ...projects.en,
  ...projects.fr,
}) as Project.Data.Id[];

for (const id of ids) {
  const en = meta(projects.en, id);
  const fr = meta(projects.fr, id);
  const mul = en || fr;
  if (!/[a-z][a-z0-9]*([A-Z][a-z0-9]*|[0-9]+)*/.test(id)) {
    safeConsole.warn('Bad project name:', JSON.stringify(id), { en, fr });
  }
  if (mul) {
    const route = en && fr ? { en, fr } : { mul };
    (routes as _.Dict<Route>)[id] = route;
    if (route.mul) {
      safeConsole.warn('Partial project:', JSON.stringify(id), { en, fr });
    }
  }
}
