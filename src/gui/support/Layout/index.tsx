import useStyles from 'isomorphic-style-loader/useStyles';
import { getTop } from '@/gui/utils/dom/getTop';
import { onLoad } from '@/gui/hooks/onLoad';
import { useLocation } from '@/gui/hooks/useLocation';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { useMobileDetectionFix } from '@/gui/hooks/useMobileDetection';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Footer } from '@/gui/molecules/Footer';
import { Intro } from '@/gui/molecules/Intro';
import { LoadingOverlay } from '@/gui/molecules/LoadingOverlay';
import { Nav } from '@/gui/molecules/Nav';

import { Context } from './Context';

import reset from '@/gui/assets/scss/reset.scss';
import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

export const Support_Layout: React.FC<Props> = (props) => {
  useStyles(reset, appStyles, styles);
  useMobileDetectionFix();

  const me = React.useComponent(
    () => {
      const playIntro = props.Screen.intro === true;
      return {
        nav: React.createRef<Nav.Ref>(),
        /** Current component state. */
        state: {
          /** Delay overlay hidding? */
          delay: playIntro,
          /** Is window loading? */
          loading: playIntro,
          /** Show overlay? */
          overlay: playIntro,
          /** Play intro? */
          playIntro,
        },
      };
    },
    {
      /** Current location pathname. */
      pathname: useLocation().pathname,
      /** Current component properties. */
      props,
    },
  );

  const minTimeoutPromiseManager = useTimeoutPromiseManager(2e3);
  const maxTimeoutPromiseManager = useTimeoutPromiseManager(9e3);
  const scrollTimeoutPromiseManager = useTimeoutPromiseManager(100);

  const scroll: Context.Value = {
    reset: () => scroll.to(me.props.goto),
    to: (el, behavior = 'smooth') => {
      const elTop = typeof el === 'number' ? el : (getTop(el) ?? 0);
      const top = elTop - (me.nav.current?.height ?? 0);
      const left = window.scrollX ?? document.documentElement.scrollLeft;
      window.scroll({ top, left, behavior });
    },
  };

  // Waits for window to finish loading before hidding overlay.
  onLoad((): void => me.updateState({ loading: false, overlay: me.state.delay }));

  // When component has been mounted...
  me.didMount(() => {
    // Waits at least 1500ms to hide overlay.
    void minTimeoutPromiseManager.restart()?.then(() => {
      me.updateState({ delay: false, overlay: me.state.loading });
    });

    // Waits at most 9000ms to hide overlay.
    void maxTimeoutPromiseManager.restart()?.then(() => {
      me.updateState({ overlay: false });
    });
  });

  // When component has been rendered...
  me.didRender(() => {
    // If pathname has changed since previous render...
    if (me.props.goto && (me.pathname !== me.prev?.pathname || delay !== me.prev?.state.delay)) {
      void scrollTimeoutPromiseManager.restart()?.then(scroll.reset);
    }
  });

  function stopIntro(): void {
    toggleIntro(false);
  }

  function toggleIntro(value?: boolean): void;
  function toggleIntro(event: React.SyntheticEvent<HTMLElement>): void;
  function toggleIntro(arg0?: boolean | React.SyntheticEvent<HTMLElement>): void {
    const event = arg0 instanceof Event ? arg0 : null;
    const playIntro = arg0 === true ? true : arg0 === false ? false : !me.state.playIntro;
    if (me.props.Screen.intro === true && !me.state.overlay && playIntro !== me.state.playIntro) {
      me.updateState({ playIntro });
    }
    event?.stopPropagation();
  }

  // Render.
  const { Screen } = me.props;
  const { delay, overlay, playIntro } = me.state;
  /** Is intro playing? Only on appropriate screen and when no overlay. */
  const introPlaying = Screen.intro === true ? playIntro && !overlay : null;
  const waitingIntro = Screen.intro === true ? overlay : null;

  return (
    <Context.Provider value={scroll}>
      <div
        className={styles.intro}
        onClick={stopIntro}
        style={Screen.intro !== void 0 ? undefined : { display: 'none' }}
      >
        <Intro play={introPlaying ?? false} className={styles.carousel} />
        <Link
          to={screens.Home}
          className={styles.logoText}
          onClick={toggleIntro}
          style={{ opacity: overlay || introPlaying ? 0 : 1 }}
        >
          <Logo.Text />
        </Link>
      </div>
      <Nav
        ref={me.nav}
        delay={delay}
        goto={props.goto}
        introPlaying={waitingIntro || introPlaying}
        styles={Screen.navStyles}
        toggleIntro={toggleIntro}
      />
      {delay ? null : <Screen />}
      {delay ? null : <Footer styles={Screen.footerStyles} />}
      <LoadingOverlay visible={overlay} />
    </Context.Provider>
  );
};

export const Layout = Support_Layout;
