import type { BarLoader as Component } from '.';

declare module '.' {
  namespace BarLoader {
    interface Props extends React.DivAttributes {}
  }

  type Props = Component.Props;
}
