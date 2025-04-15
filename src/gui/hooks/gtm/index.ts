import TagManager from 'react-gtm-module';
import { CookieConsent } from '@/gui/molecules/CookieConsent';
import { i18n } from '@/utils/i18n';
import { devConsole } from '@/utils/safeConsole';

let uninit = true;
function usePush() {
  const userChoice = CookieConsent.useUserChoice() ?? 'default';
  const notDenied = userChoice !== 'deny';

  React.useEffect(init, [notDenied]);

  function init() {
    if (uninit) {
      uninit = false;
      if (notDenied) {
        TagManager.initialize({ gtmId: conf.gtmId });
      }
      devConsole.log(`[dev] ${userChoice} dataLayer init`);
    }
  }

  function push<Data extends GTM.Data>(data: Data) {
    if (notDenied) {
      TagManager.dataLayer({ dataLayer: data });
    }
    const { event, ...rest } = data;
    devConsole.log(`[dev] ${userChoice} dataLayer:`, event, rest);
  }

  return push;
}

function usePushContactFormOutcome() {
  const push = usePush();

  function pushContactFormOutcome(status: 'Succès' | 'Echec', label: string): void {
    push({ event: 'contactFormOutcome', status, label });
  }

  return pushContactFormOutcome;
}

let landing = true;
function usePushPageView() {
  const push = usePush();

  function pushPageView(pathnameFr: string): void {
    push({ event: 'pageView', landing, language: i18n.language, pathnameFr });
    landing = false;
  }

  return pushPageView;
}

export const GTM = { usePushContactFormOutcome, usePushPageView };
