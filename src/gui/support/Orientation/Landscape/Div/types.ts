import type { OrientationDiv } from '../../Div';
import type { LandscapeDiv as Component } from '.';

declare module '.' {
  namespace LandscapeDiv {
    type Props = Omit<OrientationDiv.Props, 'type'>;
  }

  type Props = Component.Props;
}
