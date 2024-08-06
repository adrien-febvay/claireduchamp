import type { Orientation } from '..';
import type { Landscape as Component } from '.';
import type { LandscapeDiv } from './Div';

declare module '.' {
  namespace Landscape {
    type Props = Omit<Orientation.Props, 'type'>;

    namespace Div {
      type Props = LandscapeDiv.Props;
    }
  }

  type Props = Component.Props;
}
