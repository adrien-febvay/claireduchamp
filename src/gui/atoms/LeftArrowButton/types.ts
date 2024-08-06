import type { LeftArrowButton as Component } from '.';

declare module '.' {
  namespace LeftArrowButton {
    type Props = Omit<React.ButtonAttributes, 'children'>;

    type Handle = HTMLButtonElement;
  }

  type Props = Component.Props;

  type Handle = Component.Handle;
}
