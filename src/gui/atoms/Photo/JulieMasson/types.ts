import type { Photo } from '..';
import type { JulieMasson as Component } from '.';

declare module '.' {
  namespace JulieMasson {
    type Props = Omit<Photo.Props, 'credit' | 'href'>;
  }

  type Props = Component.Props;
}
