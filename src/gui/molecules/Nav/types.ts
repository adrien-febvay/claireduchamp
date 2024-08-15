import type { Nav as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace Nav {
    /** <Nav> properties. */
    type Props = Omit<React.DivAttributes, 'children'> &
      React.Styles<typeof ownStyles> & {
        /** Top of the content to scroll to (navigation bar initially solid or not?). */
        goto?: string;

        /** Is intro playing? `null` if not relevant. */
        introPlaying: boolean | null;

        /** Start/stop intro. */
        toggleIntro: (play?: boolean) => void;
      };

    /** <Nav> reference. */
    type Ref = {
      /** Navigation bar height. */
      readonly height: number | null;
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;

  /** Internal component reference. */
  type Ref = Component.Ref;
}
