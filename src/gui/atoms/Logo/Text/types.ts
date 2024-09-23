import type { LogoText as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace LogoText {
    type Props = React.DivAttributes &
      React.Styles<typeof ownStyles> & {
        h1?: boolean;
      };
  }

  type Props = Component.Props;
}
