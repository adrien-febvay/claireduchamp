import type { Head as Component } from '.';
import type { Context as HeadContext } from './Context';

declare module '.' {
  namespace Head {
    type Props = React.Children.Prop & {
      lang?: string;
      status?: number;
    };

    namespace Context {
      type Location = HeadContext.Location;

      type Value = HeadContext.Value;
    }
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
