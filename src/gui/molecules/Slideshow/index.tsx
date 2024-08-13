import useStyles from 'isomorphic-style-loader/useStyles';
import { addClass } from '@/gui/utils/dom/addClass';
import { classUnion } from '@/gui/utils/dom/classUnion';
import { removeClass } from '@/gui/utils/dom/removeClass';

import ownStyles from './styles.scss';

export const Slideshow = React.forwardRef<Handle, Props>((props, ref) => {
  useStyles(ownStyles);

  const { children, className, loop, onSlideChange, styles, ...divAttributes } = props;
  const me = React.useComponent(
    () => ({
      currentSlide: null as Element | null,
      nextSlide: (skip = 0): void => me.setSlide(me.slideIndex + skip + 1),
      prevSlide: (skip = 0): void => me.setSlide(me.slideIndex - skip - 1),
      rootRef: React.createRef<HTMLDivElement>(),
      setSlide: (index: number, triggerOnSlideChange = true): void => {
        removeClass(me.currentSlide, me.styles.current);
        if (!me.props.loop) {
          me.slideIndex = Math.min(Math.max(index, 0), me.slides.length - 1);
        } else if (index === -Infinity) {
          me.slideIndex = 0;
        } else if (index === Infinity) {
          me.slideIndex = me.slides.length - 1;
        } else if (index < 0) {
          me.slideIndex = (index % me.slides.length) + me.slides.length;
        } else {
          me.slideIndex = index % me.slides.length;
        }
        me.currentSlide = me.slides[me.slideIndex] ?? null;
        addClass(me.currentSlide, me.styles.current);
        if (triggerOnSlideChange) {
          me.props.onSlideChange?.(me);
        }
      },
      slideIndex: -1,
      slides: [] as Element[],
    }),
    {
      props,
      styles: React.extendStyles(ownStyles, styles),
    },
  );
  React.useImperativeHandle(ref, () => me);
  me.didRender(() => {
    if (!me.slides.includes(me.currentSlide)) {
      me.setSlide(0, false);
    }
  });

  let setCurrentSlide = !me.slides.includes(me.currentSlide) && me.styles.current;
  const slides = React.Children.map(children, (child) => {
    if (React.isValidElement<{ className: unknown }>(child)) {
      if (child.props.className === void 0 || typeof child.props.className === 'string') {
        const className = classUnion(child.props.className, me.styles.slide, setCurrentSlide);
        setCurrentSlide = '';
        return React.cloneElement(child, { className });
      }
    }
    return null;
  });

  return <div classNames={[me.styles.root, className]} ref={me.rootRef} children={slides} {...divAttributes} />;
});
