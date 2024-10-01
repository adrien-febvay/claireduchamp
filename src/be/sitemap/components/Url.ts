import type { Link } from '@/be/sitemap/components/Link';
import type { Loc } from '@/be/sitemap/components/Loc';
import type { _ } from '@/utils/types';

import { sitemapDate } from '@/utils/misc/date';

interface Props {
  children: [React.Element<typeof Loc>, ..._.Optional<React.Element<typeof Link>>[]];
}

export function Url({ children }: Props) {
  const [loc, ...meta] = children;
  return React.createElement(
    'url',
    void 0,
    loc,
    React.createElement('lastmod', void 0, sitemapDate()),
    React.createElement('changefreq', void 0, 'daily'),
    React.createElement('priority', void 0, '1.0'),
    ...meta,
  );
}
