import type { Scroll as Context } from '.';

declare module '.' {
  namespace Scroll {
    type EventMap = {
      reset: [];
      to: [Target, ScrollBehavior];
    };

    type Target = HTMLElement | string | null | undefined | number;
  }

  type EventMap = Context.EventMap;

  type Target = Context.Target;
}
