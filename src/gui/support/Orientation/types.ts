import type { Orientation as Component } from '.';

declare module '.' {
  namespace Orientation {
    type Props = React.Children.Prop & {
      /** Match landscape orientation?. */
      landscape?: boolean;

      /** Match portrait orientation?. */
      portrait?: boolean;
    };
  }

  type Props = Component.Props;
}
