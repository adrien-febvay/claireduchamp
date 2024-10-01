const props = {
  'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
  'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
  'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
};

interface Props {
  children: React.Node;
}

export function UrlSet({ children }: Props) {
  return React.createElement('urlset', props, children);
}
