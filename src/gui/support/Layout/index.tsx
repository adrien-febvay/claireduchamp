import { getTop } from '@/gui/utils/dom/getTop';
import { useLocation } from '@/gui/hooks/useLocation';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Footer } from '@/gui/molecules/Footer';
import { Nav } from '@/gui/molecules/Nav';
import { Context } from './Context';

import '@/gui/assets/scss/reset.scss';
import '@/gui/styles.scss';

export { Context } from './Context';

export const Support_Layout: React.FC<Props> = (props) => {
  const me = React.useComponent(() => ({ nav: React.createRef<Nav.Ref>() }), { goto: props.goto });

  const context = React.useMemo(makeContext, []);
  const scrollTimeoutPromiseManager = useTimeoutPromiseManager(100);
  React.useEffect(maybeResetScroll, [useLocation().pathname]);
  React.useEffect(updateContext, [me.nav.current]);

  function makeContext(): Context.Value {
    const scroll = new Context.Scroll();
    scroll.on('reset', () => scroll.to(me.goto));
    scroll.on('to', (target, behavior) => {
      const elTop = typeof target === 'number' ? target : (getTop(target) ?? 0);
      const top = elTop - (me.nav.current?.height ?? 0);
      const left = window?.scrollX ?? document?.documentElement.scrollLeft;
      window?.scroll({ top, left, behavior });
    });
    return { nav: null, scroll };
  }

  function maybeResetScroll() {
    if (me.goto) {
      void scrollTimeoutPromiseManager.restart()?.then(resetScroll);
    }
  }

  function resetScroll() {
    context.scroll.reset();
  }

  function updateContext() {
    context.nav = me.nav.current;
  }

  const { Screen, goto } = props;
  return (
    <Context.Provider value={context}>
      <Nav ref={me.nav} goto={goto} styles={Screen.navStyles} />
      <Screen />
      <Footer styles={Screen.footerStyles} />
    </Context.Provider>
  );
};

export const Layout = Object.assign(Support_Layout, { Context });
