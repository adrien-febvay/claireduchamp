import type { RightArrowButton as Component } from '.';

declare module '.' {
  namespace RightArrowButton {
    type Props = Omit<React.ButtonAttributes, 'children'>;

    type Handle = HTMLButtonElement;
  }

  type Props = Component.Props;

  type Handle = Component.Handle;
}
