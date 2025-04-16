import type { CookieConsent as Component } from '.';
import type { CookieConsentProvider } from './Provider';

type Set<Value> = (value: Value) => void;

declare module '.' {
  namespace CookieConsent {
    /** <CookieConsent> properties. */
    type Props = object;

    namespace Provider {
      /** <CookieConsent.Provider> properties. */
      interface Props extends CookieConsentProvider.Props {}
    }
  }

  interface Props extends Component.Props {}
  type UserChoice = CookieConsentProvider.UserChoice;
}

declare module './Context' {
  type CookieConsentContext = [
    hidden?: boolean,
    setHidden?: Set<boolean>,
    openDialog?: () => void,
    setOpenDialog?: Set<() => void>,
    userChoice?: UserChoice,
    setUserChoice?: Set<UserChoice>,
  ];

  type UserChoice = CookieConsentProvider.UserChoice;
}

declare module './Provider' {
  namespace CookieConsentProvider {
    /** <CookieConsentProvider> properties. */
    interface Props extends React.Children.Prop {}

    /** User choice: `"accept"` all cookies or `"deny"` audience cookies. */
    type UserChoice = 'accept' | 'deny';
  }

  type Props = CookieConsentProvider.Props;
  type UserChoice = CookieConsentProvider.UserChoice;
}
