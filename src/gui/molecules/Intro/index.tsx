import { Carousel } from '@/gui/atoms/Carousel';
import { Landscape, Portrait } from '@/gui/support/Orientation';

function src(no: string): string {
  return `/img/intro/claire-duchamp-villa-grandvaux-©JulieMasson-${no}.jpg`;
}

export const Molecule_Intro: React.FC<Props> = ({ play, ...carouselProps }) => (
  <>
    <Landscape>
      <Carousel autoPlay={play} {...carouselProps}>
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
      <Carousel autoPlay={play} {...carouselProps}>
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
  </>
);

export const Intro = Molecule_Intro;
