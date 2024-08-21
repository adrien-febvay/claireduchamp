import useStyles from 'isomorphic-style-loader/useStyles';
import { Carousel } from '@/gui/atoms/Carousel';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useLayout } from '@/gui/hooks/useLayout';
import { Orientation } from '@/gui/support/Orientation';

import styles from './styles.scss';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';

function url(no: string): string {
  return `/img/intro/claire-duchamp-villa-grandvaux-©JulieMasson-${no}.jpg`;
}

export const Molecule_Intro: React.FC<Props> = ({ className, ...divAttributes }) => {
  useStyles(styles);

  const me = React.useComponent(() => ({
    state: {
      playing: false,
    },
  }));

  const { playing } = me.state;

  const delayToggle = useTimeoutPromiseManager(16);
  const layout = useLayout();
  React.useEffect(listenToScrollReset, []);
  React.useEffect(handleNav, [playing]);

  onEvent(playing && document, 'scroll', stop);
  onEvent(playing && document, 'click', stop);

  React.useEffect(play, []);

  function play() {
    toggle(true);
  }

  function handleNav() {
    layout.nav?.toggle(!me.state.playing);
    return restoreNavOnUnmount;
  }

  function listenToScrollReset() {
    layout.scroll.on('reset', play);
    return () => void layout.scroll.off('reset', play);
  }

  function scrollDown() {
    layout.scroll.to(innerHeight);
  }

  function restoreNavOnUnmount() {
    layout.nav?.show();
  }

  function stop() {
    toggle(false);
  }

  function toggle(): void;
  function toggle(state: boolean): void;
  function toggle(arg0?: unknown) {
    const state = typeof arg0 === 'boolean' ? arg0 : !play;
    void delayToggle.restart()?.then(() => {
      me.updateState({ playing: state && Number(scrollY) === 0 });
    });
  }

  return (
    <div classNames={[styles.root, className]} {...divAttributes}>
      <Orientation landscape>
        <Carousel autoPlay={me.state.playing}>
          <img src={url('landscape-1')} />
          <div>
            <img src={url('landscape-2-1')} />
            <img src={url('landscape-2-2')} />
            <img src={url('landscape-2-3')} />
          </div>
          <div>
            <img src={url('landscape-3-1')} />
            <img src={url('landscape-3-2')} />
            <img src={url('landscape-3-3')} />
          </div>
          <img src={url('landscape-4')} />
          <img src={url('landscape-5')} />
          <img src={url('landscape-6')} />
        </Carousel>
      </Orientation>
      <Orientation portrait>
        <Carousel autoPlay={me.state.playing}>
          <img src={url('portrait-01')} />
          <img src={url('portrait-02')} />
          <img src={url('portrait-03')} />
          <img src={url('portrait-04')} />
          <img src={url('portrait-05')} />
          <img src={url('portrait-06')} />
          <img src={url('portrait-07')} />
          <img src={url('portrait-08')} />
          <img src={url('portrait-09')} />
          <img src={url('portrait-10')} />
          <img src={url('portrait-11')} />
        </Carousel>
      </Orientation>
      <Link to={screens.Home} className={styles.title} onClick={play} style={{ opacity: playing ? 0 : 1 }}>
        <Logo.Text />
      </Link>
      <Logo color="white" className={styles.logo} style={{ transform: `translateY(${playing ? 0 : 100}%)` }} />
      <div className={styles.downButtonContainer} style={{ transform: `translateY(${playing ? 0 : -100}%)` }}>
        <button className={styles.downButton} onClick={scrollDown}>
          <div className={styles.downArrow} />
        </button>
      </div>
    </div>
  );
};

export const Intro = Molecule_Intro;
