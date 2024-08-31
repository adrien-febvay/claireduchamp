// Load globals before other imports
import '@/utils/react';
import '@/gui/debug';
import 'core-js/stable';
import LanguageDetector from 'i18next-browser-languagedetector';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import detectMobile from 'is-mobile';
import { onBrowserOrThrow } from '@typescript/lib-dom/utils';
import { locales } from '@/gui/locales';
import { Head } from '@/gui/support/Head';
import { Router } from '@/gui/support/Router';
import { I18nextProvider, i18nInit } from '@/utils/i18n';
import { safeConsole } from '@/utils/safeConsole';

/** Root <#app> element of the React app. */
export const appElement = document?.getElementById('app');

onBrowserOrThrow(({ document }) => {
  TagManager.initialize({ gtmId: conf.gtmId });

  /** Is device mobile? */
  const isMobile = detectMobile({ tablet: true });

  /**
   * Is responsiveness enabled?
   *
   * Always `true` on mobile, can be forced on other devices with the `__forceResponsive=true` cookie.
   */
  const isResponsive = isMobile || /(^|;)\s*__forceResponsive=true(;|$)/.test(document.cookie);

  /** I18n module. */
  const i18n = i18nInit(LanguageDetector, { resources: locales });

  /** Root <App> component. */
  const App: React.FC = () => (
    <Head.Context.Provider value={Head.Context.create(document.location, isMobile, isResponsive)}>
      <StyleContext.Provider value={{ insertCss: () => {} }}>
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
      </StyleContext.Provider>
    </Head.Context.Provider>
  );

  if (!appElement) {
    safeConsole.error('Could not start React: <#app> not found');
  } else if (appElement.children.length) {
    ReactDOM.hydrateRoot(appElement, <App />);
  } else {
    React.addClass(appElement, isMobile ? 'mobile' : 'desktop', isResponsive ? 'responsive' : 'not-responsive');
    ReactDOM.createRoot(appElement).render(<App />);
  }
});
