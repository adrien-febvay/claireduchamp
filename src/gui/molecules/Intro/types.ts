import type { Intro as Component } from '.';

declare module '.' {
  namespace Intro {
    type Props = React.DivAttributes;
  }

  type Props = Component.Props;
}
