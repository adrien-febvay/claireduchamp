import useStyles from 'isomorphic-style-loader/useStyles';
import { useNavigate } from 'react-router-dom';
import { LeftArrowButton as PrevButton } from '@/gui/atoms/LeftArrowButton';
import { RightArrowButton as NextButton } from '@/gui/atoms/RightArrowButton';
import { Slideshow } from '@/gui/molecules/Slideshow';
import { gridGen } from '@/gui/utils/grid/gen';
import { getOuter } from '@/gui/utils/dom/getOuterSize';
import { between } from '@/gui/utils/number/between';
import { pad as padNumber } from '@/gui/utils/number/pad';

import styles from './styles.scss';

const MAX_WIDTH = 3087;
const MAX_HEIGHT = 1440;
const RATIO = MAX_WIDTH / MAX_HEIGHT;
const MIN_WIDTH = 766;
const MIN_HEIGHT = MIN_WIDTH / RATIO;
const GAP = 10;

/** Slideshow key mapping. */
const KEYS = {
  ArrowLeft: [-2, -Infinity],
  ArrowRight: [0, Infinity],
};
type Key = keyof typeof KEYS;

export const Screen_Project_Slideshow: React.FC<Props> = (props) => {
  useStyles(styles);

  const me = React.useComponent(
    () => ({
      ref: {
        next: React.createRef<HTMLDivElement>(),
        prev: React.createRef<HTMLDivElement>(),
        slideshow: React.createRef<Slideshow.Handle>(),
      },
    }),
    {
      props,
    },
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener('resize', resizeViewer);
    document.addEventListener('keyup', handleKeyup);

    const slideIndex = Math.floor((me.props.photoIndex - 1) / 3);
    if (slideIndex) {
      me.ref.slideshow.current?.setSlide(slideIndex, false);
    }

    return () => {
      window.removeEventListener('resize', resizeViewer);
      document.removeEventListener('keyup', handleKeyup);
      document.body.style.overflow = '';
    };
  }, []);

  React.useEffect(resizeViewer);

  function toogleScrollbars(): void {
    const { innerWidth, innerHeight } = window;
    const { offsetWidth, offsetHeight } = document.body;
    const overflow = offsetWidth > innerWidth && offsetHeight > innerHeight;
    document.body.style.overflow = overflow ? '' : 'hidden';
  }

  function next(): void {
    me.ref.slideshow.current?.nextSlide();
  }

  function handleKeyup(event: KeyboardEvent): void {
    if (!(event.altKey || event.shiftKey)) {
      const skip = KEYS[event.code as Key]?.[Number(event.ctrlKey)];
      if (skip != null) {
        me.ref.slideshow.current?.nextSlide(skip);
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  function prev(): void {
    me.ref.slideshow.current?.prevSlide();
  }

  function resizeViewer(): void {
    toogleScrollbars();
    const availableSize = me.props.getAvailableSize();
    const nextWidth = getOuter.width(me.ref.next.current);
    const prevWidth = getOuter.width(me.ref.prev.current);
    const slideshow = me.ref.slideshow.current?.rootRef.current;
    if (availableSize && nextWidth && prevWidth && slideshow) {
      const { width, height } = availableSize;
      const freeWidth = width - nextWidth - prevWidth - GAP;
      const ratio = freeWidth / height;
      const calcWidth = ratio > RATIO ? height * RATIO : freeWidth;
      const calcHeight = ratio < RATIO ? freeWidth / RATIO : height;
      const finalWidth = between(calcWidth, MIN_WIDTH, MAX_WIDTH) + GAP;
      const finalHeight = between(calcHeight, MIN_HEIGHT, MAX_HEIGHT);
      slideshow.style.width = `${finalWidth}px`;
      slideshow.style.height = `${finalHeight}px`;
    }
  }

  function updatePathname({ slideIndex }: Slideshow.Handle): void {
    const pathname = me.props.project.pathname;
    const photoIndex = slideIndex * 3 + 1;
    const url = photoIndex > 1 ? `${pathname}/${photoIndex}` : pathname;
    navigate(url, { replace: true });
  }

  const { pictures } = me.props.project;
  const copyrights: Dict<string> | null = pictures.copyrights;
  const path = `/img/projects/claire-duchamp-${pictures.basename}`;
  const pad = padNumber.accordingTo(pictures.count);
  const slides = gridGen(pictures.count, 3, (index) => {
    const copyright = copyrights[index + 1] ?? pictures.copyrights[0];
    const suffix = copyright ? `--${copyright}` : '';
    return `${path}--${pad(index + 1)}${suffix}.jpg`;
  });

  return (
    <>
      <div ref={me.ref.prev} className={styles.prev}>
        <PrevButton className={styles.button} onClick={prev} />
      </div>
      <Slideshow className={styles.slideshow} loop ref={me.ref.slideshow} onSlideChange={updatePathname}>
        {slides.map((photos, slideIndex) => (
          <div key={slideIndex} className={styles.slide}>
            {photos.map((src, photoIndex) => (
              <img key={photoIndex} className={styles.photo} src={src} />
            ))}
          </div>
        ))}
      </Slideshow>
      <div ref={me.ref.next} className={styles.next}>
        <NextButton className={styles.button} onClick={next} />
      </div>
    </>
  );
};

export const ProjectSlideshow = Screen_Project_Slideshow;
