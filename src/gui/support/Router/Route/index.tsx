import { useParams } from 'react-router-dom';
import { useTranslation } from '@/utils/i18n';
import { gtm } from '@/gui/utils/gtm';
import { applyParamsToUrl } from '@/gui/utils/url/applyParams';
import { Head } from '@/gui/support/Head';
import { Layout } from '@/gui/support/Layout';
import { Context, pathname } from '../Context';
import { useLocation } from '@/gui/hooks/useLocation';

const Support_Router_Route: React.FC<Props> = ({ desc }) => {
  const { Screen, language, locales, meta, pathnameFr, status } = desc;
  const [translate, i18n] = useTranslation('support/Router/Meta');
  const location = useLocation();

  const appTitle = translate('title', '');
  const description = meta.description || translate('description', '');
  const keywords = `${translate('keywords', '')}${meta.keywords ? `, ${meta.keywords}` : ''}`;
  const title = meta.title ? `${meta.title} • ${appTitle}` : appTitle;

  if (document) {
    document.title = title;
  }

  const params = { ...desc.meta.params, ...useParams() };

  pathname.prev = pathname.curr;
  pathname.curr = location.pathname;

  if (language !== 'mul' && language !== i18n.language) {
    void i18n.changeLanguage(language);
  }

  React.useEffect(pageView, [desc.meta.pathname]);

  function pageView(): void {
    gtm.pageView(applyParamsToUrl(pathnameFr, params));
  }

  function buildUrl(pathname?: string) {
    return pathname && `${location.protocol}//${location.host}${applyParamsToUrl(pathname, params)}`;
  }

  function Link(props: React.LinkHTMLAttributes<HTMLLinkElement>) {
    return props.href && <link {...props} />;
  }

  return (
    <Context.Provider value={{ locales, params, pathname: { ...pathname } }}>
      {!document && (
        <Head lang={language === 'mul' ? 'x-default' : language} status={status}>
          <title>{title}</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="author" content="Claire Duchamp" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={location.pathname} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:url" content={location.pathname} />
          <Link rel="alternate" hrefLang="en" href={buildUrl(locales.en?.pathname)} />
          <Link rel="alternate" hrefLang="fr" href={buildUrl(locales.fr?.pathname)} />
          <Link rel="alternate" hrefLang="fr" href={buildUrl(locales.mul?.pathname)} />
          <link rel="canonical" hrefLang="fr" href={buildUrl(locales.mul?.pathname ?? pathnameFr)} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
      )}
      <Layout Screen={Screen} goto={meta.goto} />
    </Context.Provider>
  );
};

export const Route = Support_Router_Route;
