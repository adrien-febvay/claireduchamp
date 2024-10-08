import { Carousel } from '@/gui/atoms/Carousel';
import { Image } from '@/gui/atoms/Image';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useLayout } from '@/gui/hooks/useLayout';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { Orientation } from '@/gui/support/Orientation';

import styles from './styles.scss';
import landscapeLowresStyles from './landscape-lowres.scss';
import portraitLowresStyles from './portrait-lowres.scss';

const NEST = 'appartement-chardonne';
const VILLA = 'villa-grandvaux';

function url(project: string, no: string): string {
  return `/img/intro/claire-duchamp-${project}-©JulieMasson-${no}.jpg`;
}

export const Molecule_Intro: React.FC<Props> = ({ className, ...divAttributes }) => {
  const me = React.useComponent(() => ({
    state: {
      init: true,
      playing: false,
    },
  }));

  const { playing } = me.state;

  const delayToggle = useTimeoutPromiseManager(16);
  const delayInit = useTimeoutPromiseManager(16);
  const layout = useLayout();

  onEvent(playing && document, 'click, scroll', stop, []);
  onEvent(layout.scroll, 'reset', play, []);

  React.useEffect(preinit, []);

  function init() {
    me.updateState({ init: false });
    play();
  }

  function play() {
    toggle(true);
  }

  function preinit() {
    void delayInit.start()?.then(init);
  }

  function scrollDown() {
    layout.scroll.to(innerHeight);
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
        {me.state.init ? (
          <Carousel>
            <Image src={url(VILLA, 'landscape-1')} styles={landscapeLowresStyles} />
            <div />
          </Carousel>
        ) : (
          <Carousel autoPlay={me.state.playing}>
            <Image src={url(VILLA, 'landscape-1')} styles={landscapeLowresStyles} />
            <div>
              <img src={url(NEST, 'landscape-7-1')} />
              <img src={url(NEST, 'landscape-7-2')} />
              <img src={url(NEST, 'landscape-7-3')} />
            </div>
            <img src={url(VILLA, 'landscape-4')} />
            <div>
              <img src={url(VILLA, 'landscape-2-1')} />
              <img src={url(VILLA, 'landscape-2-2')} />
              <img src={url(VILLA, 'landscape-2-3')} />
            </div>
            <img src={url(VILLA, 'landscape-5')} />
            <div>
              <img src={url(VILLA, 'landscape-3-1')} />
              <img src={url(VILLA, 'landscape-3-2')} />
              <img src={url(VILLA, 'landscape-3-3')} />
            </div>
            <img src={url(VILLA, 'landscape-6')} />
          </Carousel>
        )}
      </Orientation>
      <Orientation portrait>
        {me.state.init ? (
          <Carousel>
            <Image src={url(VILLA, 'portrait-01')} styles={portraitLowresStyles} />
            <div />
          </Carousel>
        ) : (
          <Carousel autoPlay={me.state.playing}>
            <Image src={url(VILLA, 'portrait-01')} styles={portraitLowresStyles} />
            <img src={url(VILLA, 'portrait-02')} />
            <img src={url(VILLA, 'portrait-03')} />
            <img src={url(VILLA, 'portrait-04')} />
            <img src={url(VILLA, 'portrait-05')} />
            <img src={url(VILLA, 'portrait-06')} />
            <img src={url(VILLA, 'portrait-07')} />
            <img src={url(VILLA, 'portrait-08')} />
            <img src={url(VILLA, 'portrait-09')} />
            <img src={url(VILLA, 'portrait-10')} />
            <img src={url(VILLA, 'portrait-11')} />
          </Carousel>
        )}
      </Orientation>
      <Link to={screens.Home} className={styles.title} onClick={play}>
        <Logo.Text />
      </Link>
      <button className={styles.logo} onClick={scrollDown} style={{ transform: `translateY(${playing ? 0 : 100}%)` }}>
        <Logo.Image className={styles.logoImage} />
      </button>
      <div className={styles.downButtonContainer}>
        <button className={styles.downButton} onClick={scrollDown}>
          <div className={styles.downArrow} />
        </button>
      </div>
    </div>
  );
};

export const Intro = Molecule_Intro;
