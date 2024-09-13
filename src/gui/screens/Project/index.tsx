import type { _ } from '@/utils/types';

import useStyles from 'isomorphic-style-loader/useStyles';
import { useNavigate } from 'react-router-dom';
import { useFullscreen } from '@/gui/utils/dom/useFullscreen';
import { useTranslation } from 'react-i18next';
import { CloseButton } from '@/gui/atoms/CloseButton';
import { FullscreenButton } from '@/gui/atoms/FullscreenButton';
import { Link } from '@/gui/atoms/Link';
import { useDevice } from '@/gui/hooks/useDevice';
import { useParams } from '@/gui/hooks/useParams';
import { usePathname } from '@/gui/hooks/usePathname';
import { getCssValue } from '@/gui/utils/dom/getCssValue';
import { getOuter } from '@/gui/utils/dom/getOuterSize';
import { getPadding } from '@/gui/utils/dom/getPadding';
import { localStorage } from '@/gui/utils/misc/localStorage';
import { Preview } from './Preview';
import { ProjectSlideshow } from './Slideshow';
import { ProjectThumbnailGrid } from './ThumbnailGrid';
import { projects } from './projects';
import { routes } from './routes';

import appStyles from '@/gui/styles.scss';
import footerStyles from './footer.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/Project';

const FULLSCREEN = 'ProjectFullscreen';

const ProjectScreen: React.FC = () => {
  useStyles(styles, navStyles, footerStyles);

  const me = React.useComponent(() => ({
    ref: {
      content: React.createRef<HTMLDivElement>(),
      credits: React.createRef<HTMLDivElement>(),
      header: React.createRef<HTMLDivElement>(),
      root: React.createRef<HTMLDivElement>(),
    },
  }));

  const prevPathname = usePathname().prev;
  const [translate, { lang }] = useTranslation(namespace);
  const fullscreen = useFullscreen(me.ref.root);
  const { id, photo } = useParams<Params>();
  const device = useDevice();
  const navigate = useNavigate();

  function getAvailableSize(): _.Size | null {
    const credsHeight = getOuter.height(me.ref.credits.current) ?? 0;
    const headHeight = getOuter.height(me.ref.header.current) ?? 0;
    const heightSum = credsHeight + headHeight;
    const content = me.ref.content.current;
    const colGap = getCssValue.toFloat(content, 'column-gap') ?? 0;
    const rowGap = getCssValue.toFloat(content, 'row-gap') ?? 0;
    const paddingWidth = getPadding.hrz.sum(me.ref.root.current) ?? 0;
    const paddingHeight = getPadding.vrt.sum(me.ref.root.current) ?? 0;
    const width = innerWidth && innerWidth - paddingWidth - 2 * colGap;
    const height = innerHeight && innerHeight - paddingHeight - heightSum - 3 * rowGap;
    return width && height && width > 0 && height > 0 ? { width, height } : null;
  }

  function autoFullscreen(): void {
    if (device.desktop && localStorage.getItem(FULLSCREEN) !== 'false') {
      toggleFullscreen();
    }
  }

  function toggleFullscreen(): void {
    void fullscreen.toggle();
    localStorage.setItem(FULLSCREEN, String(!fullscreen.active));
  }

  React.useEffect(autoFullscreen, []);

  const project = projects[lang][id];
  const pathnameFr = projects.fr[id].pathname;

  return (
    <article classNames={[appStyles.lightTheme, styles.article]} ref={me.ref.root}>
      <div ref={me.ref.content} className={styles.content}>
        <div className={styles.header} ref={me.ref.header}>
          <div className={styles.properties}>
            <h6>{project.caption}</h6>
            <h2>{project.title}</h2>
            {project.info && <p>{project.info}</p>}
          </div>
          <FullscreenButton classNames={styles.button} onClick={toggleFullscreen} revoke={fullscreen.active} />
          <CloseButton className={styles.button} onClick={() => void (prevPathname ? navigate(-1) : navigate('/'))} />
        </div>
        <ProjectSlideshow
          getAvailableSize={getAvailableSize}
          project={project}
          photoIndex={photo ? Number.parseInt(photo) : NaN}
        />
        <ProjectThumbnailGrid
          className={styles.thumbnailGrid}
          photoIndex={photo ? Number.parseInt(photo) : 0}
          project={{ ...project, id, pathnameFr }}
        />
        <div className={styles.credits} ref={me.ref.credits}>
          {translate('photography')}
          &nbsp;
          <Link to="https://www.juliemasson.ch/">©JulieMasson</Link>
        </div>
      </div>
    </article>
  );
};

export const Project = Object.assign(ProjectScreen, {
  footerStyles,
  namespace,
  navStyles,
  Preview,
  subroutes: Object.values(routes),
  ...routes,
} as const);
