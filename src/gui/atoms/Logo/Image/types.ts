import type { LogoImage as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace LogoImage {
    type Props = React.DivAttributes &
      React.Styles<typeof ownStyles> & {
        svgAttrs?: React.SVGAttributes<SVGElement>;
      };
  }

  type Props = Component.Props;
}
