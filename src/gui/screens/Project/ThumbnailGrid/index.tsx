import { useTranslation } from 'react-i18next';
import { arrayGen } from '@/gui/utils/array/gen';
import { pad as padNumber } from '@/gui/utils/number/pad';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { ProjectViewer } from '@/gui/screens/Project/Viewer';
import { ProjectCoverText } from '../CoverText';

import styles from './styles.scss';
import coverTextStyles from './cover-text.scss';

const BASEPATH = '/img/projects/claire-duchamp';

export const Screen_Project_ThumbnailGrid: React.FC<Props> = (props) => {
  const { photoIndex, project, ...divAttrs } = props;

  const [translate] = useTranslation(Project.namespace);

  const { caption, id, pictures, title } = project;
  const copyrights: { [key in number]?: string | null } = pictures.copyrights;
  const path = `${BASEPATH}-${pictures.basename}`;
  const pad = padNumber.accordingTo(Math.max(pictures.count, 10));
  const thumbnail = translate('thumbnail');
  const imgs = arrayGen(pictures.count, (index) => {
    const copyright = copyrights[index + 1] ?? pictures.copyrights[0];
    const suffix = copyright ? `--${copyright}` : '';
    const src = `${path}--${pad(index + 1)}-thumbnail${suffix}.jpg`;
    const alt = `${title} - ${caption} - ${thumbnail} ${index + 1}`;
    return { src, alt };
  });

  const coverPhotos = props.project.coverPhotos.map(({ copyright, width }, index) => {
    const suffix = copyright ? `--${copyright}` : '';
    const src = `${path}--couverture-${index + 1}${suffix}.jpg`;
    const alt = `${caption} – ${title} – ${translate('cover')}`;
    const style = { flexGrow: width, aspectRatio: `${width}/1440` };
    return { src, alt, style };
  });

  const coverPhotosWidths = props.project.coverPhotos.map(({ width }) => `${width}fr`);

  return (
    <div classNames={styles.root} {...divAttrs}>
      <div className={styles.coverPhotosContainer} style={{ gridTemplateColumns: coverPhotosWidths.join(' ') }}>
        {coverPhotos.map((attrs, index) => (
          <img key={index} className={styles.coverPhoto} {...attrs} />
        ))}
      </div>
      <ProjectCoverText styles={coverTextStyles} project={project}>
        <div classNames={styles.grid}>
          {imgs.map((imgAttrs, index) => {
            const photo = String(index + 1);
            return (
              <Link key={index} to={Project[id]} params={{ photo }} preventScrollReset>
                <img className={styles.thumbnail} {...imgAttrs} />
              </Link>
            );
          })}
        </div>
      </ProjectCoverText>
      <ProjectViewer photoIndex={photoIndex} project={project} />
    </div>
  );
};

export const ProjectThumbnailGrid = Screen_Project_ThumbnailGrid;
