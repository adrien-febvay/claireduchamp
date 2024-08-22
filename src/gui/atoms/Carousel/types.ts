import type { CarouselProps as LegacyCarouselProps } from 'react-responsive-carousel';
import type { Carousel as Component } from '.';

declare module '.' {
  namespace Carousel {
    type Props = React.classNames.Props & {
      /** Auto play? */
      autoPlay?: boolean;

      /** Children elements. */
      children?: LegacyCarouselProps['children'];
    };
  }

  type Props = Component.Props;
}
