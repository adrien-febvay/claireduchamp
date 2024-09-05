import useStyles from 'isomorphic-style-loader/useStyles';
import { arrayGen } from '@/gui/utils/array/gen';
import { onEvent } from '@/gui/hooks/onEvent';
import { useSwipe } from '@/gui/utils/dom/useSwipe';
import { gtm } from '@/gui/utils/gtm';
import { pad } from '@/gui/utils/number/pad';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { CloseButton } from './CloseButton';

import styles from './styles.scss';

const BASEPATH = '/img/projects/claire-duchamp';

export const Screen_Project_Viewer: React.FC<Props> = (props) => {
  useStyles(styles);

  const me = React.useComponent(
    () => ({
      ref: {
        closeButton: React.createRef<CloseButton.Handle>(),
        frame: React.createRef<HTMLDivElement>(),
        root: React.createRef<HTMLDivElement>(),
        slider: React.createRef<HTMLDivElement>(),
      },
      state: {
        photoIndex: props.photoIndex,
      },
      currSlideIndex: 1,
      showCloseButton: true,
    }),
    {
      props,
    },
  );

  React.useEffect(reset);

  onEvent(window, 'resize', onResize, []);

  const toggleSwiping = useSwipe(me.ref.slider, handleSwipe);
  const swipeTimeoutPromiseManager = useTimeoutPromiseManager();

  function calcSliderLeft(): number {
    return typeof innerWidth === 'undefined' ? 0 : (1 - me.currSlideIndex) * (innerWidth + 2);
  }

  function close(): void {
    window?.history.back();
  }

  function finalizePhotoChange(): void {
    if (!me.currSlideIndex) {
      me.currSlideIndex = me.props.project.pictures.count;
    } else if (me.currSlideIndex > me.props.project.pictures.count) {
      me.currSlideIndex = 1;
    }
    moveSlider();
    toggleSwiping(true);
    updateUrl();
  }

  function handleSwipe(event: TouchEvent, data: useSwipe.Event.Data): void {
    const { axis, deltaX, deltaY, deltaT, speedX, speedY } = data;
    if (event.type === 'touchend') {
      const { innerWidth = 1, innerHeight = 1 } = window ?? {};
      moveRoot(0, true);
      if (axis === null && deltaT < 750) {
        me.ref.closeButton.current?.toggle();
      } else if (axis !== 'y' && Math.abs(deltaX + (innerWidth * speedX) / 4) >= innerWidth / 2) {
        toggleSwiping(false);
        me.currSlideIndex = me.currSlideIndex + (deltaX > 0 ? -1 : 1);
        void swipeTimeoutPromiseManager.restart(250)?.then(finalizePhotoChange);
      } else if (axis === 'y' && deltaY + (innerHeight * speedY) / 10 <= -innerHeight / 2.5) {
        moveRoot(-innerHeight, true);
        toggleSwiping(false);
        void swipeTimeoutPromiseManager.restart(500)?.then(close);
      }
      moveSlider(0, true);
    } else {
      if (axis !== null) {
        me.ref.closeButton.current?.hide();
      }
      moveSlider(axis !== 'y' ? deltaX : 0);
      moveRoot(axis === 'y' ? Math.min(deltaY, 0) : 0);
    }
  }

  function moveRoot(y = 0, animate = false): void {
    const frame = me.ref.frame.current;
    const root = me.ref.root.current;
    if (frame && root) {
      const amplitude = (y ?? 0) / (innerHeight ?? 1);
      const tenth = amplitude * 10;
      const transform = y ? `translateY(${tenth}%) translateY(${y}px) scale(${1 + amplitude})` : '';
      frame.style.transition = animate ? '' : 'none';
      frame.style.transform = transform;
      root.style.transition = animate ? '' : 'none';
      root.style.opacity = y ? String(1 + amplitude) : '';
    }
  }

  function moveSlider(x = 0, animate = false): void {
    const slider = me.ref.slider.current;
    if (slider) {
      slider.style.transition = animate ? '' : 'none';
      slider.style.left = `${calcSliderLeft() + x}px`;
    }
  }

  function onResize(): void {
    toggleSwiping();
    moveSlider();
    toggleSwiping();
  }

  function reset(): void {
    const { photoIndex } = me.props;
    if (photoIndex !== me.prev?.props.photoIndex && photoIndex !== me.state.photoIndex) {
      me.setState({ photoIndex });
    } else {
      moveRoot();
      toggleSwiping(true);
      if (me.prev?.state.photoIndex !== me.state.photoIndex) {
        updateUrl();
      }
    }
  }

  function updateUrl(): void {
    const { photoIndex } = me.state;
    const { pathname, pathnameFr, pictures } = me.props.project;
    const urlPhotoIndex = photoIndex && (photoIndex + me.currSlideIndex - 1) % pictures.count;
    const url = urlPhotoIndex ? `${pathname}/${urlPhotoIndex}` : pathname;
    if (url !== location?.pathname) {
      window?.history?.replaceState(null, document?.title ?? '', url);
      if (urlPhotoIndex || me.prev) {
        gtm.pageView(urlPhotoIndex ? `${pathnameFr}/${urlPhotoIndex}` : pathname);
      }
    }
  }

  const { photoIndex, project, ...divAttrs } = props;
  const { basename, count } = project.pictures;
  const copyrights: Dict<string> | null = project.pictures.copyrights;
  const photos = arrayGen(count + 2, (index) => {
    const finalIndex = ((me.state.photoIndex + index + count - 2) % count) + 1;
    const copyright = copyrights[finalIndex] ?? project.pictures.copyrights[0];
    const suffix = copyright ? `--${copyright}` : '';
    return `${BASEPATH}-${basename}--${pad.accordingTo(count)(finalIndex)}${suffix}.jpg`;
  });

  if (me.state.photoIndex !== photoIndex) {
    me.currSlideIndex = 1;
  }

  if (me.state.photoIndex) {
    return (
      <div ref={me.ref.root} classNames={styles.root} {...divAttrs}>
        <div ref={me.ref.frame} classNames={styles.frame}>
          <div ref={me.ref.slider} className={styles.slider} style={{ left: calcSliderLeft() }}>
            <div className={styles.pictures}>
              {photos.map((src, index) => (
                <img key={index} src={src} className={styles.photo} />
              ))}
            </div>
          </div>
          <CloseButton
            ref={me.ref.closeButton}
            className={styles.closeButton}
            duration={3000}
            initialDuration={750}
            onClick={close}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const ProjectViewer = Screen_Project_Viewer;
