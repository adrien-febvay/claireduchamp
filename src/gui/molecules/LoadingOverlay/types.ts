import type { LoadingOverlay as Component } from '.';

declare module '.' {
  namespace LoadingOverlay {
    interface Props {
      /** Load event handler. */
      onLoad?: () => void;

      /** Visible? */
      visible?: boolean;
    }
  }

  type Props = Component.Props;
}
