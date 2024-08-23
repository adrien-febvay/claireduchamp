import TagManager from 'react-gtm-module';
import { i18n } from '@/utils/i18n';
import { devConsole } from '@/utils/safeConsole';

export function push<Data extends gtm.Data>(data: Data): void {
  TagManager.dataLayer({ dataLayer: data });
  const { event, ...rest } = data;
  devConsole.log('[dev] dataLayer:', event, rest);
}

export function contactFormOutcome(status: 'Succès' | 'Echec', label: string): void {
  push({ event: 'contactFormOutcome', status, label });
}

let landing = true;
export function pageView(pathnameFr: string): void {
  push({ event: 'pageView', landing, language: i18n.language, pathnameFr });
  landing = false;
}

export const gtm = { push, pageView };
