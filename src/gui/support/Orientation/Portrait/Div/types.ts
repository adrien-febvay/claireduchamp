import type { OrientationDiv } from '../../Div';
import type { PortraitDiv as Component } from '.';

declare module '.' {
  namespace PortraitDiv {
    type Props = Omit<OrientationDiv.Props, 'type'>;
  }

  type Props = Component.Props;
}
