import useStyles from 'isomorphic-style-loader/useStyles';
import { Carousel } from '@/gui/atoms/Carousel';
import { useScroll } from '@/gui/support/Layout/useScroll';
import { Landscape, Portrait } from '@/gui/support/Orientation';

import styles from './styles.scss';

function src(no: string): string {
  return `/img/intro/claire-duchamp-villa-grandvaux-©JulieMasson-${no}.jpg`;
}

export const Molecule_Intro: React.FC<Props> = ({ className, play, ...divAttributes }) => {
  useStyles(styles);
  const scroll = useScroll();

  return (
    <div classNames={[styles.root, className]} {...divAttributes}>
      <Landscape>
        <Carousel autoPlay={play}>
          <img src={src('landscape-1')} />
          <div>
            <img src={src('landscape-2-1')} />
            <img src={src('landscape-2-2')} />
            <img src={src('landscape-2-3')} />
          </div>
          <div>
            <img src={src('landscape-3-1')} />
            <img src={src('landscape-3-2')} />
            <img src={src('landscape-3-3')} />
          </div>
          <img src={src('landscape-4')} />
          <img src={src('landscape-5')} />
          <img src={src('landscape-6')} />
        </Carousel>
      </Landscape>
      <Portrait>
        <Carousel autoPlay={play}>
          <img src={src('portrait-01')} />
          <img src={src('portrait-02')} />
          <img src={src('portrait-03')} />
          <img src={src('portrait-04')} />
          <img src={src('portrait-05')} />
          <img src={src('portrait-06')} />
          <img src={src('portrait-07')} />
          <img src={src('portrait-08')} />
          <img src={src('portrait-09')} />
          <img src={src('portrait-10')} />
          <img src={src('portrait-11')} />
        </Carousel>
      </Portrait>
      <div classNames={[styles.downButtonContainer, !play && styles.show]}>
        <button className={styles.downButton} onClick={() => void scroll.to(innerHeight)}>
          <div className={styles.downArrow} />
        </button>
      </div>
    </div>
  );
};

export const Intro = Molecule_Intro;
