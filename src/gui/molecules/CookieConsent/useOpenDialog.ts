import { CookieConsentContext } from './Context';

export function useOpenDialog() {
  return React.useContext(CookieConsentContext)[2];
}
