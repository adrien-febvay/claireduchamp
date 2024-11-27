import type { Image } from '../Image';
import type { Triptych as Component } from '.';

declare module '.' {
  namespace Triptych {
    type Props = Omit<Image.Props, keyof Image.Orientation>;
  }

  type Props = Component.Props;
}
