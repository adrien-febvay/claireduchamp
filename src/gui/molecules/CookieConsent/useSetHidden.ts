import { CookieConsentContext } from './Context';

export function useSetHidden() {
  return React.useContext(CookieConsentContext)[3]?.setHidden;
}
