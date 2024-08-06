import type { CloseButton as Component } from '.';

declare module '.' {
  namespace CloseButton {
    type Props = Omit<React.ButtonAttributes, 'children'>;

    type Handle = HTMLButtonElement;
  }

  type Props = Component.Props;

  type Handle = Component.Handle;
}
