import { Template as Component } from '.';

declare module '.' {
  namespace Template {
    interface Props extends React.DivAttributes {}
  }

  interface Props extends Component.Props {}
}
