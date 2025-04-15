import type { Switch as Component } from '.';

declare module '.' {
  namespace Switch {
    type Props = Omit<React.ButtonAttributes, 'children'> & {
      checked?: boolean;
      onToggle?: (nextChecked: boolean) => void;
    };
  }

  type Props = Component.Props;
}
