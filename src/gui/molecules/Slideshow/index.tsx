import ownStyles from './styles.scss';

export const Slideshow = React.forwardRef<Handle, Props>((props, ref) => {
  const { children, className, loop, onSlideChange, styles, ...divAttributes } = props;
  const me = React.useComponent(
    () => ({
      currentSlide: null as Element | null,
      nextSlide: (skip = 0): void => me.setSlide(me.slideIndex + skip + 1),
      prevSlide: (skip = 0): void => me.setSlide(me.slideIndex - skip - 1),
      rootRef: React.createRef<HTMLDivElement>(),
      setSlide: (index: number, triggerOnSlideChange = true): void => {
        React.removeClass(me.currentSlide, me.styles.current);
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
        React.addClass(me.currentSlide, me.styles.current);
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
    // ESLint fails to get the proper type, TS knows it is `Element[]`, as intended.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    me.slides = [...(me.rootRef.current?.getElementsByClassName(ownStyles.slide) ?? [])];
    if (!me.slides.includes(me.currentSlide)) {
      me.setSlide(0, false);
    }
  });

  const slides = React.Children.map(children, (child, index) =>
    React.addClass(child, me.styles.slide, !index && me.styles.current),
  );

  return <div classNames={[me.styles.root, className]} ref={me.rootRef} children={slides} {...divAttributes} />;
});
