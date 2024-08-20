import useStyles from 'isomorphic-style-loader/useStyles';
import { getTop } from '@/gui/utils/dom/getTop';
import { useLocation } from '@/gui/hooks/useLocation';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Footer } from '@/gui/molecules/Footer';
import { Intro } from '@/gui/molecules/Intro';
import { Nav } from '@/gui/molecules/Nav';

import { Context } from './Context';

import reset from '@/gui/assets/scss/reset.scss';
import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

export const Support_Layout: React.FC<Props> = (props) => {
  useStyles(reset, appStyles, styles);

  const me = React.useComponent(
    () => {
      const playIntro = props.Screen.intro === true;
      return {
        nav: React.createRef<Nav.Ref>(),
        /** Current component state. */
        state: {
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

  const scrollTimeoutPromiseManager = useTimeoutPromiseManager(100);

  const scroll: Context.Value = {
    reset: () => scroll.to(me.props.goto),
    to: (el, behavior = 'smooth') => {
      const elTop = typeof el === 'number' ? el : (getTop(el) ?? 0);
      const top = elTop - (me.nav.current?.height ?? 0);
      const left = window?.scrollX ?? document?.documentElement.scrollLeft;
      window?.scroll({ top, left, behavior });
    },
  };

  // When component has been rendered...
  me.didRender(() => {
    // If pathname has changed since previous render...
    if (me.props.goto && me.pathname !== me.prev?.pathname) {
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
    if (me.props.Screen.intro === true && playIntro !== me.state.playIntro) {
      me.updateState({ playIntro });
    }
    event?.stopPropagation();
  }

  // Render.
  const { Screen } = me.props;
  const { playIntro } = me.state;
  /** Is intro playing? Only on appropriate screen. */
  const introPlaying = Screen.intro ? playIntro : null;

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
          style={{ opacity: introPlaying ? 0 : 1 }}
        >
          <Logo.Text />
        </Link>
      </div>
      <Nav
        ref={me.nav}
        goto={props.goto}
        introPlaying={introPlaying}
        styles={Screen.navStyles}
        toggleIntro={toggleIntro}
      />
      <Screen />
      <Footer styles={Screen.footerStyles} />
    </Context.Provider>
  );
};

export const Layout = Support_Layout;
