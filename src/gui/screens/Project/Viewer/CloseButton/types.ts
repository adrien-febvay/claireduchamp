import type { CloseButton as Component } from '.';

declare module '.' {
  namespace CloseButton {
    type Handle = {
      hide: () => void;
      show: () => void;
      toggle: (show?: boolean) => boolean;
    };

    type Props = React.ButtonAttributes & {
      duration?: number;
      initialDuration?: number;
    };
  }

  type Handle = Component.Handle;

  type Props = Component.Props;
}
