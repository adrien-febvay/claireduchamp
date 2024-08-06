import type { Phone as Component } from '.';

declare module '.' {
  namespace Phone {
    type Props = Omit<React.AnchorAttributes, 'href'> & {
      /** Phone number. */
      number: string;
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
