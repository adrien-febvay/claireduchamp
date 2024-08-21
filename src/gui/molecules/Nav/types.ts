import type { Nav as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace Nav {
    /** <Nav> properties. */
    type Props = Omit<React.DivAttributes, 'children'> &
      React.Styles<typeof ownStyles> & {
        /** Top of the content to scroll to (navigation bar initially solid or not?). */
        goto?: string;
      };

    /** <Nav> reference. */
    type Ref = {
      /** Navigation bar height. */
      readonly height: number | null;
      readonly hide: (this: void) => void;
      readonly show: (this: void) => void;
      readonly toggle: (this: void, state?: boolean) => void;
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;

  /** Internal component reference. */
  type Ref = Component.Ref;
}
