import { Items as Component } from '.';

declare module '.' {
  namespace Items {
    interface Props extends React.DivAttributes {
      keys?: string[];
      h1?: boolean;
    }
  }

  interface Props extends Component.Props {}
}
