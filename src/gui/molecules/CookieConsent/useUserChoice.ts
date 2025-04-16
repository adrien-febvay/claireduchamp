import { CookieConsentContext } from './Context';

export function useUserChoice() {
  return React.useContext(CookieConsentContext)[4];
}
