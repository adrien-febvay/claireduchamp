import type { Intro as Component } from '.';

declare module '.' {
  namespace Intro {
    type Props = React.DivAttributes & {
      /** Play intro? */
      play?: boolean;
    };
  }

  type Props = Component.Props;
}
