import type { Language } from '@/utils/i18n';

import { LocationContext } from '@/be/sitemap/support/LocationContext';

interface Props {
  hrefLang: Language | 'x-default';
  href: string;
}

const rel = 'alternate';

export function Link({ hrefLang, href }: Props) {
  const { baseurl } = React.useContext(LocationContext);
  return React.createElement('xhtml:link', { rel, hrefLang, href: `${baseurl}${href}` });
}
