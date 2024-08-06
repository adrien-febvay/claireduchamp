import type { Footer as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace Footer {
    type Props = Omit<React.DivAttributes, 'children'> & React.Styles<typeof ownStyles>;
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
