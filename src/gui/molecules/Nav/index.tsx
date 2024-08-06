import useStyles from 'isomorphic-style-loader/useStyles';
import { getInner } from '@/gui/utils/dom/getInnerSize';
import { useTranslation, Resources } from '@/utils/i18n';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Language } from '@/gui/molecules/Language';
import { useScroll } from '@/gui/support/Layout/useScroll';

import ownStyles from './styles.scss';

const namespace = 'molecules/Nav';

export const Molecule_Nav = React.forwardRef<Ref, Props>((props, ref) => {
  useStyles(ownStyles);

  const me = React.useComponent(
    () => ({
      /**  */
      continueContainer: React.createRef<HTMLDivElement>(),
      /** Menu container element. */
      menuContainer: React.createRef<HTMLDivElement>(),
      /** Navigation element. */
      nav: React.createRef<HTMLDivElement>(),
      /** Navigation slide element. */
      navSlide: React.createRef<HTMLDivElement>(),
      /** Document vertical scroll position. */
      scrollY: Math.max(typeof scrollY === 'undefined' ? 0 : scrollY, 0),
      /** Small navigation element. */
      smallNav: React.createRef<HTMLDivElement>(),
      /** Small navigation bar element. */
      smallNavBar: React.createRef<HTMLDivElement>(),
      /** Current component state. */
      state: {
        /** Is menu open? */
        open: false,
        /** Show navigation bar? */
        show: !props.introPlaying,
        /** Solid background? (or transparent?) */
        solid: false,
      },
    }),
    {
      /** Current component properties. */
      props,
    },
  );

  React.useImperativeHandle(ref, () => ({
    get height(): number | null {
      const navInnerHeight = getInner.height(me.nav.current);
      return navInnerHeight ?? getInner.height(me.smallNavBar.current);
    },
  }));

  const menuTimeoutPromiseManager = useTimeoutPromiseManager(750);
  const navTimeoutPromiseManager = useTimeoutPromiseManager(750);
  const openTimeoutPromiseManager = useTimeoutPromiseManager(16);
  const showTimeoutPromiseManager = useTimeoutPromiseManager(16);

  if (typeof document !== 'undefined') {
    onEvent(document, 'scroll', onScroll);
  }
  React.useEffect(didMount, []);
  React.useEffect(updateShowNav, [props.introPlaying]);

  function didMount(): void {
    onScroll();
    toggleMenuElements(false);
    toggleContinueContainer();
  }

  /** Document scroll listener. */
  function onScroll(): void {
    updateNavPadding();

    const solid = window.scrollY > 0;
    if (solid !== me.state.solid) {
      me.updateState({ solid });
    }
    if (me.props.introPlaying && scrollY > me.scrollY) {
      me.props.toggleIntro(false);
    }
    me.scrollY = Math.max(scrollY, 0);
    if (me.navSlide.current) {
      me.navSlide.current.style.left = `-${scrollX}px`;
    }
  }

  function startIntro(event: React.SyntheticEvent<HTMLElement>): void {
    event.stopPropagation();
    me.props.toggleIntro(true);
  }

  function stopIntro(event: React.SyntheticEvent<HTMLElement>): void {
    event.stopPropagation();
    me.props.toggleIntro(false);
  }

  function toggleContinueContainer(): void {
    const continueContainer = me.continueContainer.current;
    if (continueContainer) {
      continueContainer.style.display = me.props.introPlaying ? '' : 'none';
    }
  }

  function toggleShowNav(state: boolean): void {
    if (state) {
      void navTimeoutPromiseManager.restart()?.then(toggleContinueContainer);
    } else {
      navTimeoutPromiseManager.abort();
      toggleContinueContainer();
    }
    void showTimeoutPromiseManager.restart()?.then(() => me.updateState({ show: state }));
  }

  function toggleMenuElements(open: boolean): void {
    const menuContainer = me.menuContainer.current;
    const smallNav = me.smallNav.current;
    if (menuContainer && smallNav) {
      menuContainer.style.display = open ? '' : 'none';
      smallNav.style.height = open ? '100dvh' : '';
    }
  }

  function toggleMenu(state = !me.state.open, intro?: boolean): void {
    if (state) {
      menuTimeoutPromiseManager.abort();
      toggleMenuElements(true);
    } else {
      void menuTimeoutPromiseManager.restart()?.then(() => toggleMenuElements(false));
    }
    void openTimeoutPromiseManager.restart()?.then(() => me.updateState({ open: state }));
    me.props.toggleIntro(intro);
  }

  function updateNavPadding(): void {
    if (me.nav.current) {
      const paddingTop = Math.max(60 - window.scrollY, 8);
      me.nav.current.style.paddingTop = `${paddingTop}px`;
    }
  }

  function updateShowNav(): void {
    toggleShowNav(!introPlaying);
  }

  // Render.
  const { introPlaying, styles } = me.props;
  const [translate] = useTranslation(namespace);
  const scroll = useScroll();

  /** CSS styles merged. */
  const allStyles = React.extendStyles(ownStyles, styles);

  /** Navigation bar appearance: menu open? solid or transparent? */
  const menuState = me.state.open && allStyles.open;
  const solidity = me.state.solid ? allStyles.solid : allStyles.transparent;

  type To = Link.Props['to'];
  type Label = keyof Resources[typeof namespace];

  const entry = (to: To, label: Label): React.Node => (
    <div className={allStyles.entry}>
      <Link to={to} onClick={() => void toggleMenu(false)}>
        {translate(label)}
      </Link>
    </div>
  );

  const item = (to: To, label: Label, extra?: React.Node): React.Node => (
    <div className={allStyles.item}>
      <Link to={to}>{translate(label)}</Link>
      {extra}
    </div>
  );

  const language = <Language className={allStyles.language} />;

  return (
    <>
      <div
        classNames={[allStyles.scrollDownContainer, me.state.show && !me.state.open && allStyles.show]}
        style={{ display: props.delay || introPlaying === null ? 'none' : 'block' }}
      >
        <button className={allStyles.scrollDownButton} onClick={() => void scroll.to(window.innerHeight)}>
          <div className={allStyles.downArrow} />
        </button>
      </div>
      <div classNames={[allStyles.root, menuState, solidity]}>
        <div className={allStyles.smallNav} ref={me.smallNav}>
          <div className={allStyles.menuContainer} ref={me.menuContainer}>
            <div className={allStyles.menu}>
              <Link to={screens.Home} className={allStyles.smallLogoText} onClick={() => void toggleMenu(false, true)}>
                <Logo.Text />
              </Link>
              <div className={allStyles.menuEntries}>
                {entry(screens.Projects, 'projects')}
                {entry(screens.Services, 'services')}
                {entry(screens.AboutUs, 'about-us')}
                {entry(screens.ContactUs, 'contact-us')}
              </div>
              {language}
            </div>
          </div>
          <div className={allStyles.smallNavBar} ref={me.smallNavBar}>
            <div className={allStyles.home}>
              <Link to={screens.Home} onClick={() => void toggleMenu(false)}>
                <Logo.Image className={allStyles.smallLogo} />
              </Link>
            </div>
            <div className={allStyles.more}>
              <button onClick={() => void toggleMenu(void 0, false)} />
            </div>
          </div>
        </div>
        <div classNames={[allStyles.largeNav, me.state.show && allStyles.show]}>
          <div ref={me.continueContainer} className={allStyles.continueContainer} onClick={stopIntro}>
            <button className={allStyles.continue} onClick={stopIntro}>
              <Logo color="white" className={allStyles.largeLogo} />
            </button>
          </div>
          <div className={allStyles.largeNavBar} onClick={stopIntro} ref={me.navSlide}>
            <nav ref={me.nav}>
              <div className={allStyles.group}>
                {item(screens.Projects, 'projects')}
                {item(screens.Services, 'services')}
              </div>
              <Link to={screens.Home} className={allStyles.item} onClick={startIntro}>
                <Logo.Text className={allStyles.largeLogoText} />
              </Link>
              <div className={allStyles.group}>
                {item(screens.AboutUs, 'about-us')}
                {item(screens.ContactUs, 'contact-us', language)}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
});

export const Nav = Molecule_Nav;
