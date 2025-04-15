import type { CookieConsentProvider } from './Provider';

declare module '.' {
  namespace CookieConsent {
    namespace Provider {
      interface Props extends CookieConsentProvider.Props {}
    }
  }
}

declare module './Context' {
  type CookieConsentContext = [userChoice?: UserChoice, accept?: () => void, deny?: () => void];

  type UserChoice = CookieConsentProvider.UserChoice;
}

declare module './Provider' {
  namespace CookieConsentProvider {
    interface Props extends React.Children.Prop {}

    type UserChoice = 'accept' | 'deny';
  }

  type Props = CookieConsentProvider.Props;
  type UserChoice = CookieConsentProvider.UserChoice;
}
