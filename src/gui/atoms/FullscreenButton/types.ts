import type { FullscreenButton as Component } from '.';

declare module '.' {
  namespace FullscreenButton {
    type Props = Omit<React.ButtonAttributes, 'children'> & {
      /** Revoke fullscreen? */
      revoke?: boolean;
    };

    type Handle = HTMLButtonElement;
  }

  type Props = Component.Props;

  type Handle = Component.Handle;
}
