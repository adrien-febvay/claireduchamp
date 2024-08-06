import type { Language as Component } from '.';

declare module '.' {
  namespace Language {
    interface Props extends React.DivAttributes {}
  }

  type Props = Component.Props;
}
