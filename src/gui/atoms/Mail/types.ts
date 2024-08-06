import type { Mail as Component } from '.';

declare module '.' {
  namespace Mail {
    type Props = Omit<React.AnchorAttributes, 'href'> & {
      /** Email address. */
      address: string;
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
