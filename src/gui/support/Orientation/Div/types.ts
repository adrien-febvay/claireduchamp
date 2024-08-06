import type { Orientation } from '..';
import type { OrientationDiv as Component } from '.';

declare module '.' {
  namespace OrientationDiv {
    type Props = Orientation.Props & React.DivAttributes;
  }

  type Props = Component.Props;
}
