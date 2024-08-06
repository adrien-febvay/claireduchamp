import type { CarouselProps as LegacyCarouselProps } from 'react-responsive-carousel';
import type { Carousel as Component } from '.';

declare module '.' {
  namespace Carousel {
    type Props = {
      /** Auto play? */
      autoPlay?: boolean;

      /** Children elements. */
      children?: LegacyCarouselProps['children'];

      /** CSS class name(s). */
      className?: string;
    };
  }

  type Props = Component.Props;
}
