import { Triptych as Component } from '.';

declare module '.' {
  namespace Triptych {
    interface Props {
      project: string;
      index: number;
    }
  }

  interface Props extends Component.Props {}
}
