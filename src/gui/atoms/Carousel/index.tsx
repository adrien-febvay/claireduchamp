import { Carousel as LegacyCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './styles.scss';

const options = {
  infiniteLoop: true,
  interval: 2000,
  showArrows: false,
  showIndicators: false,
  showStatus: false,
  showThumbs: false,
  stopOnHover: false,
  swipeable: false,
  useKeyboardArrows: true,
};

export const Atom_Carousel: React.FC<Props> = (props) => {
  const me = React.useComponent(() => ({ ref: { legacyCarousel: React.createRef<LegacyCarousel>() } }), { props });

  me.didUpdate(() => {
    if (me.props.autoPlay === false) {
      me.ref.legacyCarousel.current?.selectItem({ selectedItem: 0 });
    }
  });

  const { autoPlay = true, children, className } = props;
  const zoomIn = autoPlay && styles.zoomIn;
  return (
    <LegacyCarousel
      autoPlay={autoPlay}
      className={React.classNames(styles.root, zoomIn, className)}
      ref={me.ref.legacyCarousel}
      {...options}
    >
      {children}
    </LegacyCarousel>
  );
};

export const Carousel = Atom_Carousel;
