import { Items as Component } from '.';

declare module '.' {
  namespace Items {
    interface Props extends React.DivAttributes {
      keys?: string[];
    }
  }

  interface Props extends Component.Props {}
}
