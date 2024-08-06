import type { Carousel } from '@/gui/atoms/Carousel';
import type { Intro as Component } from '.';

declare module '.' {
  namespace Intro {
    type Props = Carousel.Props & {
      /** Play intro? */
      play?: boolean;
    };
  }

  type Props = Component.Props;
}
