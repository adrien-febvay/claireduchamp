import { Slideshow as Component } from '.';

import ownStyles from './styles.scss';

declare module '.' {
  namespace Slideshow {
    /** <Slideshow> handle. */
    type Handle = {
      /** Current slide element. */
      currentSlide: Element | null;

      /**
       * Show next slide.
       * @param skip Number of slides to skip.
       */
      nextSlide(skip?: number): void;

      /**
       * Show previous slide.
       * @param skip Number of slides to skip.
       */
      prevSlide(skip?: number): void;

      /** Root <div> element reference.*/
      rootRef: React.RefObject<HTMLDivElement>;

      /**
       * Show a specific slide.
       * @param index Index of the slide to show.
       */
      setSlide(index: number, triggerOnSlideChange?: boolean): void;

      /** Index of the current slide. */
      slideIndex: number;

      /** Slide elements. */
      slides: Element[];
    };

    /** <Slideshow> component properties. */
    type Props = React.DivAttributes &
      React.Styles<typeof ownStyles> & {
        /** Loop? */
        loop?: boolean;

        /** Function to execute upon slide change. */
        onSlideChange?: (slideshow: Handle) => void;
      };
  }

  /** Component handle. */
  type Handle = Component.Handle;

  /** Internal component properties. */
  type Props = Component.Props;
}
