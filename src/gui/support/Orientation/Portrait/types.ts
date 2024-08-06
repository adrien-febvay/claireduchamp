import type { Orientation } from '..';
import type { Portrait as Component } from '.';
import type { PortraitDiv } from './Div';

declare module '.' {
  namespace Portrait {
    type Props = Omit<Orientation.Props, 'type'>;

    namespace Div {
      type Props = PortraitDiv.Props;
    }
  }

  type Props = Component.Props;
}
