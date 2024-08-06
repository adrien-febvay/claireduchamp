import type { Route as Component } from '.';
import type { RouteDesc } from '../routes';

declare module '.' {
  namespace Route {
    type Props = {
      /** Route description, including metadata. */
      desc: RouteDesc;
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
