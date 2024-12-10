import { getInner } from '@/gui/utils/dom/getInnerSize';
import { useTranslation } from '@/utils/i18n';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Language } from '@/gui/molecules/Language';
import { Items } from './Items';

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
    };
  }

  function didMount(): void {
    onScroll();
    toggleMenuElements(false);
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

  const language = <Language className={allStyles.language} />;
  const groups = translate('order').split(/\s*;\s*/);
  const [leftItems, rightItems] = groups.map((itemKeys) => itemKeys.split(/\s*,\s*/));
  return (
    <div classNames={[allStyles.root, menuState, solidity]}>
      <div className={allStyles.smallNav} ref={me.smallNav}>
        <div className={allStyles.menuContainer} ref={me.menuContainer}>
          <div className={allStyles.menu}>
            <Link to={screens.Home} className={allStyles.smallLogoText} onClick={() => void toggleMenu(false)}>
              <Logo.Text />
            </Link>
            <Items className={allStyles.menuEntries}>
              <Items.Template className={allStyles.entry} onClick={() => void toggleMenu(false)} />
            </Items>
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
      <div className={allStyles.largeNav}>
        <div className={allStyles.largeNavBar} ref={me.navSlide}>
          <nav ref={me.nav}>
            <Items className={allStyles.group} keys={leftItems} h1>
              <Items.Template className={allStyles.item} />
            </Items>
            <Link to={screens.Home} className={allStyles.largeLogoItem}>
              <Logo.Text className={allStyles.largeLogoText} />
            </Link>
            <Items className={allStyles.group} keys={rightItems} h1>
              <Items.Template className={allStyles.item} />
              {language}
            </Items>
          </nav>
        </div>
      </div>
    </div>
  );
});

export const Nav = Molecule_Nav;
