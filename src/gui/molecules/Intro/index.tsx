import { Carousel } from '@/gui/atoms/Carousel';
import { Link, screens } from '@/gui/atoms/Link';
import { Logo } from '@/gui/atoms/Logo';
import { onEvent } from '@/gui/hooks/onEvent';
import { useLayout } from '@/gui/hooks/useLayout';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { CookieConsent } from '@/gui/molecules/CookieConsent';
import { Orientation } from '@/gui/support/Orientation';
import { Image } from './Image';
import { Triptych } from './Triptych';

import styles from './styles.scss';
import landscapeLowresStyles from './landscape-lowres.scss';
import portraitLowresStyles from './portrait-lowres.scss';

const NEST = 'chardonneApartment2024';
const VILLA = 'villaGrandvaux2023';

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
  const setCookieConsentHidden = CookieConsent.useSetHidden();

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

  function toggle(state: boolean) {
    setCookieConsentHidden?.(state);
    void delayToggle.restart()?.then(() => {
      me.updateState({ playing: state && Number(scrollY) === 0 });
    });
  }

  return (
    <div classNames={[styles.root, className]} {...divAttributes}>
      <Orientation landscape>
        {me.state.init ? (
          <Carousel>
            <Image projectId={VILLA} landscape pictureKey="1" styles={landscapeLowresStyles} />
            <div />
          </Carousel>
        ) : (
          <Carousel autoPlay={me.state.playing}>
            <Image projectId={VILLA} landscape pictureKey="1" styles={landscapeLowresStyles} />
            <Triptych projectId={NEST} pictureKey="8" />
            <Triptych projectId={NEST} pictureKey="7" />
            <Triptych projectId={NEST} pictureKey="9" />
            <Triptych projectId={NEST} pictureKey="2" />
            <Triptych projectId={NEST} pictureKey="10" />
            <Image projectId={VILLA} landscape pictureKey="5" />
            <Triptych projectId={NEST} pictureKey="11" />
            <Triptych projectId={NEST} pictureKey="3" />
            <Triptych projectId={NEST} pictureKey="12" />
            <Image projectId={VILLA} landscape pictureKey="6" />
          </Carousel>
        )}
      </Orientation>
      <Orientation portrait>
        {me.state.init ? (
          <Carousel>
            <Image projectId={VILLA} portrait pictureKey="01" styles={portraitLowresStyles} />
            <div />
          </Carousel>
        ) : (
          <Carousel autoPlay={me.state.playing}>
            <Image projectId={VILLA} portrait pictureKey="01" styles={portraitLowresStyles} />
            <Image projectId={NEST} portrait pictureKey="12" />
            <Image projectId={VILLA} portrait pictureKey="05" />
            <Image projectId={NEST} portrait pictureKey="13" />
            <Image projectId={VILLA} portrait pictureKey="06" />
            <Image projectId={NEST} portrait pictureKey="14" />
            <Image projectId={VILLA} portrait pictureKey="07" />
            <Image projectId={NEST} portrait pictureKey="15" />
            <Image projectId={VILLA} portrait pictureKey="08" />
            <Image projectId={NEST} portrait pictureKey="16" />
            <Image projectId={VILLA} portrait pictureKey="09" />
            <Image projectId={NEST} portrait pictureKey="17" />
            <Image projectId={NEST} portrait pictureKey="18" />
            <Image projectId={NEST} portrait pictureKey="19" />
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
