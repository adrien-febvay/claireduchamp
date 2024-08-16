// Load globals before other imports
import '@/utils/react';
import '@/gui/debug';
import 'core-js/stable';
import LanguageDetector from 'i18next-browser-languagedetector';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import detectMobile from 'is-mobile';
import { locales } from '@/gui/locales';
import { Head } from '@/gui/support/Head';
import { Router } from '@/gui/support/Router';
import { I18nextProvider, i18nInit } from '@/utils/i18n';

TagManager.initialize({ gtmId: conf.gtmId });

export const appElement = document?.getElementById('app');
const isMobile = /(^|;)\s*__forceMobile=true(;|$)/.test(document?.cookie ?? '') || detectMobile({ tablet: true });
if (appElement) {
  appElement.className = isMobile ? 'mobile' : 'desktop';
}

const i18n = i18nInit(LanguageDetector, { resources: locales });

const App: React.FC = () => (
  <Head.Context.Provider value={{ location, isMobile }}>
    <StyleContext.Provider value={{ insertCss: () => {} }}>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </StyleContext.Provider>
  </Head.Context.Provider>
);

if (!appElement) {
  console.error('Could not start React: #app not found');
} else if (appElement.children.length) {
  ReactDOM.hydrateRoot(appElement, <App />);
} else {
  ReactDOM.createRoot(appElement).render(<App />);
}
