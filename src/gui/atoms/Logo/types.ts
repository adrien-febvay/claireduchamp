import type { Logo as Component } from '.';
import type { LogoImage } from './Image';
import type { LogoText } from './Text';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace Logo {
    type Props = React.DivAttributes &
      React.Styles<typeof ownStyles> & {
        imageProps?: LogoImage.Props;
        textProps?: LogoText.Props;
      };
  }

  type Props = Component.Props;
}
