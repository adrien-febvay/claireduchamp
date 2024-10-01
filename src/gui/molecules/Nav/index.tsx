import { getInner } from '@/gui/utils/dom/getInnerSize';
import { useTranslation, Resources } from '@/utils/i18n';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Language } from '@/gui/molecules/Language';

import ownStyles from './styles.scss';

const namespace = 'molecules/Nav';

export const Molecule_Nav = React.forwardRef<Ref, Props>((props, ref) => {
  const me = React.useComponent(
    () => ({
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
        /** Show navigation bar when at the top of the screen? */
        show: true,
        /** Solid background? (or transparent?) */
        solid: false,
      },
    }),
    {
      /** Current component properties. */
      props,
    },
  );

  React.useImperativeHandle(ref, createRef, []);

  const menuTimeoutPromiseManager = useTimeoutPromiseManager(750);
  const openTimeoutPromiseManager = useTimeoutPromiseManager(16);

  const [translate] = useTranslation(namespace);

  onEvent(document, 'scroll', onScroll, []);
  React.useEffect(didMount, []);
  // React.useEffect(show);

  function createRef() {
    return {
      get height(): number | null {
        const navInnerHeight = getInner.height(me.nav.current);
        return navInnerHeight ?? getInner.height(me.smallNavBar.current);
      },
      hide,
      show,
      toggle,
    };
  }

  function didMount(): void {
    onScroll();
    toggleMenuElements(false);
  }

  function hide() {
    me.updateState({ show: false });
  }

  /** Document scroll listener. */
  function onScroll(): void {
    updateNavPadding();

    const scrollY = window?.scrollY ?? 0;
    const solid = scrollY > 0;
    if (solid !== me.state.solid) {
      me.updateState({ solid });
    }
    me.scrollY = Math.max(scrollY, 0);
    if (me.navSlide.current) {
      me.navSlide.current.style.left = `-${scrollX}px`;
    }
  }

  function show() {
    me.updateState({ show: true });
  }

  function toggle(state?: boolean) {
    if (state ?? !me.state.show) {
      show();
    } else {
      hide();
    }
  }

  function toggleMenuElements(open: boolean): void {
    const menuContainer = me.menuContainer.current;
    const smallNav = me.smallNav.current;
    if (menuContainer && smallNav) {
      menuContainer.style.display = open ? '' : 'none';
      smallNav.style.height = open ? '100dvh' : '';
    }
  }

  function toggleMenu(state = !me.state.open): void {
    if (state) {
      menuTimeoutPromiseManager.abort();
      toggleMenuElements(true);
    } else {
      void menuTimeoutPromiseManager.restart()?.then(() => toggleMenuElements(false));
    }
    void openTimeoutPromiseManager.restart()?.then(() => me.updateState({ open: state }));
  }

  function updateNavPadding(): void {
    if (me.nav.current) {
      const paddingTop = Math.max(60 - (scrollY ?? 0), 8);
      me.nav.current.style.paddingTop = `${paddingTop}px`;
    }
  }

  /** CSS styles merged. */
  const allStyles = React.extendStyles(ownStyles, me.props.styles);

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
    <div classNames={[allStyles.root, menuState, solidity]}>
      <div className={allStyles.smallNav} ref={me.smallNav}>
        <div className={allStyles.menuContainer} ref={me.menuContainer}>
          <div className={allStyles.menu}>
            <Link to={screens.Home} className={allStyles.smallLogoText} onClick={() => void toggleMenu(false)}>
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
            <button onClick={() => void toggleMenu()} />
          </div>
        </div>
      </div>
      <div classNames={[allStyles.largeNav, me.state.show && allStyles.show]}>
        <div className={allStyles.largeNavBar} ref={me.navSlide}>
          <nav ref={me.nav}>
            <div className={allStyles.group}>
              {item(screens.Projects, 'projects')}
              {item(screens.Services, 'services')}
            </div>
            <Link to={screens.Home} className={allStyles.item}>
              <Logo.Text h1 className={allStyles.largeLogoText} />
            </Link>
            <div className={allStyles.group}>
              {item(screens.AboutUs, 'about-us')}
              {item(screens.ContactUs, 'contact-us', language)}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
});

export const Nav = Molecule_Nav;
