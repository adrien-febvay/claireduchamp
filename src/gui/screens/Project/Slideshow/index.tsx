import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LeftArrowButton as PrevButton } from '@/gui/atoms/LeftArrowButton';
import { RightArrowButton as NextButton } from '@/gui/atoms/RightArrowButton';
import { onEvent } from '@/gui/hooks/onEvent';
import { Slideshow } from '@/gui/molecules/Slideshow';
import { Project } from '@/gui/screens/Project';
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
  ArrowDown: ['nextSlide', 'lastSlide'],
  ArrowLeft: ['prevSlide', 'firstSlide'],
  ArrowRight: ['nextSlide', 'lastSlide'],
  ArrowUp: ['prevSlide', 'firstSlide'],
} as const;
type Key = keyof typeof KEYS;

export const Screen_Project_Slideshow: React.FC<Props> = (props) => {
  const me = React.useComponent(
    () => ({
      ref: {
        coverTextPanelContent: React.createRef<HTMLDivElement>(),
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
  const [translate] = useTranslation(Project.namespace);
  onEvent(window, 'resize', resizeViewer, []);
  onEvent(document, 'keyup', handleKeyup, []);

  React.useEffect(() => {
    me.ref.slideshow.current?.setSlide(Math.ceil(me.props.photoIndex / 3), false);
    return () => {
      if (document) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  React.useEffect(resizeViewer);

  function toogleScrollbars() {
    if (window) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = window.document.body;
      const overflow = offsetWidth > innerWidth && offsetHeight > innerHeight;
      window.document.body.style.overflow = overflow ? '' : 'hidden';
    }
  }

  function next() {
    me.ref.slideshow.current?.nextSlide();
  }

  function handleKeyup(event: KeyboardEvent) {
    if (!(event.altKey || event.shiftKey)) {
      const action = KEYS[event.code as Key]?.[Number(event.ctrlKey)];
      if (action) {
        me.ref.slideshow.current?.[action]();
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  function prev() {
    me.ref.slideshow.current?.prevSlide();
  }

  function resizeViewer() {
    toogleScrollbars();
    const availableSize = me.props.getAvailableSize();
    const nextWidth = getOuter.width(me.ref.next.current);
    const prevWidth = getOuter.width(me.ref.prev.current);
    const slideshow = me.ref.slideshow.current?.rootRef.current;
    const coverTextPanelContent = me.ref.coverTextPanelContent.current;
    if (availableSize && nextWidth && prevWidth) {
      const { width, height } = availableSize;
      const freeWidth = width - nextWidth - prevWidth - GAP;
      const ratio = freeWidth / height;
      const calcWidth = ratio > RATIO ? height * RATIO : freeWidth;
      const calcHeight = ratio < RATIO ? freeWidth / RATIO : height;
      const finalWidth = between(calcWidth, MIN_WIDTH, MAX_WIDTH) + GAP;
      const finalHeight = between(calcHeight, MIN_HEIGHT, MAX_HEIGHT);
      const scale = finalHeight / MAX_HEIGHT;
      if (slideshow) {
        slideshow.style.width = `${finalWidth}px`;
        slideshow.style.height = `${finalHeight}px`;
      }
      if (coverTextPanelContent) {
        coverTextPanelContent.style.transform = `scale(${scale})`;
      }
    }
  }

  function updatePathname({ slideIndex }: Slideshow.Handle) {
    const pathname = me.props.project.pathname;
    navigate(slideIndex ? `${pathname}/${slideIndex * 3}` : pathname, { replace: true });
  }

  const { caption, pictures, title, longDescription, surface, quote, text, info } = me.props.project;
  const copyrights: { [key in number]?: string | null } = pictures.copyrights;
  const path = `/img/projects/claire-duchamp-${pictures.basename}`;
  const pad = padNumber.accordingTo(Math.max(pictures.count, 10));
  const picture = translate('picture');
  const slides = gridGen(pictures.count, 3, (index) => {
    const copyright = copyrights[index + 1] ?? pictures.copyrights[0];
    const suffix = copyright ? `--${copyright}` : '';
    const src = `${path}--${pad(index + 1)}${suffix}.jpg`;
    const alt = `${caption} – ${title} – ${picture} ${index + 1}`;
    return { src, alt };
  });

  let coverPhotosWidth = (me.props.project.coverPhotos?.length || 1) * 5 - 5;
  const coverPhotos = me.props.project.coverPhotos.map(({ copyright, width }, index) => {
    const suffix = copyright ? `--${copyright}` : '';
    const src = `${path}--couverture-${index + 1}${suffix}.jpg`;
    const alt = `${caption} – ${title} – ${translate('cover')}`;
    const style = { aspectRatio: `${width}/1440` };
    coverPhotosWidth += width;
    return { src, alt, style };
  });

  return (
    <>
      <div ref={me.ref.prev} className={styles.prev}>
        <PrevButton className={styles.button} onClick={prev} />
      </div>
      <Slideshow className={styles.slideshow} loop ref={me.ref.slideshow} onSlideChange={updatePathname}>
        <div className={styles.cover}>
          <div className={styles.coverTextPanel}>
            <div
              className={styles.coverTextPanelContent}
              ref={me.ref.coverTextPanelContent}
              style={{ width: `${3105 - (coverPhotosWidth ?? 0)}px` }}
            >
              <div className={styles.coverBlock}>
                {longDescription && <p>{longDescription}</p>}
                {surface && <p>{surface}</p>}
              </div>
              {quote?.text && (
                <div className={styles.quote}>
                  <i>{quote.text}</i>
                  {quote.author && <i>—&nbsp;{quote.author}</i>}
                </div>
              )}
              <div classNames={[styles.coverBlock, styles.textBlock]}>
                {text?.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
              {info?.flat().length && (
                <div className={styles.info}>
                  {info.map((infoColumn, columnIndex) => (
                    <div key={columnIndex} className={styles.infoColumn}>
                      {infoColumn.map((infoCell, rowIndex) => (
                        <div key={rowIndex} className={styles.infoCell}>
                          {infoCell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.coverPhotosContainer}>
            {coverPhotos.map((attrs) => (
              <img className={styles.coverPhoto} {...attrs} />
            ))}
          </div>
        </div>
        {slides.map((photos, slideIndex) => (
          <div key={slideIndex} className={styles.slide}>
            {photos.map((imgProps, photoIndex) => (
              <img key={photoIndex} className={styles.photo} {...imgProps} />
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
