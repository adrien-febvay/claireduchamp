import { Link } from '@/be/sitemap/components/Link';
import { Loc } from '@/be/sitemap/components/Loc';
import { Url } from '@/be/sitemap/components/Url';
import { UrlSet } from '@/be/sitemap/components/UrlSet';
import { LocationContext } from '@/be/sitemap/support/LocationContext';
import { root } from '@/gui/support/Router/routes';

interface Props {
  baseurl: string;
}

export function Sitemap({ baseurl }: Props) {
  const routes = root.children
    .filter(({ path }) => path !== '*')
    .map((route) => {
      const path = route.path.replace(/\/:\w+\?/g, '');
      const locales = route.desc.locales;
      return { path, locales };
    });
  return (
    <LocationContext.Provider value={{ baseurl }}>
      <UrlSet>
        <Url>
          <Loc>/</Loc>
          <Link hrefLang="x-default" href="/" />
        </Url>
        {routes.map(({ path, locales }) => (
          <Url key={path}>
            <Loc>{path}</Loc>
            {locales.fr && <Link hrefLang="fr" href={locales.fr.pathname} />}
            {locales.en && <Link hrefLang="en" href={locales.en.pathname} />}
          </Url>
        ))}
      </UrlSet>
    </LocationContext.Provider>
  );
}
