import type { Content as Component } from '.';

declare module '.' {
  namespace Content {
    interface Props extends React.DivAttributes {
      text: string;
    }
  }

  interface Props extends Component.Props {}
}
