import type { useOrientation } from '@/gui/hooks/useOrientation';
import type { Orientation as Component } from '.';

import { Landscape as LandscapeComponent } from './Landscape';
import { Portrait as PortraitComponent } from './Portrait';

declare module '.' {
  namespace Orientation {
    type Props = React.Children.Prop & {
      /** To override orientation detection. */
      override?: useOrientation.OverrideFunction;

      /** Orientation type. */
      type: Type;
    };

    type Type = useOrientation.Orientation;

    namespace Landscape {
      type Props = LandscapeComponent.Props;

      namespace Div {
        type Props = LandscapeComponent.Div.Props;
      }
    }

    namespace Portrait {
      type Props = PortraitComponent.Props;

      namespace Div {
        type Props = LandscapeComponent.Div.Props;
      }
    }
  }

  type Props = Component.Props;

  type Type = Component.Type;
}
