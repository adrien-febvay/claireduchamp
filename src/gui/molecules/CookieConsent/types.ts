import type { CookieConsent as Component } from '.';
import type { CookieConsentProvider } from './Provider';

declare module '.' {
  namespace CookieConsent {
    /** <CookieConsent> properties. */
    type Props = object;

    namespace Provider {
      /** <CookieConsent.Provider> properties. */
      interface Props extends CookieConsentProvider.Props {}
    }

    /** <CookieConsent> handle. */
    interface Handle {
      /** Open cookie consent dialog box. */
      openDialog: () => void;

      /** Hide cookie consent features? */
      setHidden: (value: boolean) => void;
    }
  }

  interface Handle extends Component.Handle {}
  interface Props extends Component.Props {}
  type UserChoice = CookieConsentProvider.UserChoice;
}

declare module './Context' {
  type CookieConsentContext = [
    userChoice?: UserChoice,
    setAndSaveUserChoice?: (value: UserChoice) => void,
    sethandle?: React.Dispatch<React.SetStateAction<Component.Handle | undefined>>,
    handle?: Component.Handle,
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

  type Handle = Component.Handle;
  type Props = CookieConsentProvider.Props;
  type UserChoice = CookieConsentProvider.UserChoice;
}
