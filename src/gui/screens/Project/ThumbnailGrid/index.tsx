import { arrayGen } from '@/gui/utils/array/gen';
import { pad as padNumber } from '@/gui/utils/number/pad';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { ProjectViewer } from '@/gui/screens/Project/Viewer';

import styles from './styles.scss';

const BASEPATH = '/img/projects/claire-duchamp';

export const Screen_Project_ThumbnailGrid: React.FC<Props> = (props) => {
  const { photoIndex, project, ...divAttrs } = props;
  const { id, pictures } = project;
  const copyrights: Dict<string> | null = pictures.copyrights;
  const path = `${BASEPATH}-${pictures.basename}`;
  const pad = padNumber.accordingTo(pictures.count);
  const imgs = arrayGen(pictures.count, (index) => {
    const copyright = copyrights[index + 1] ?? pictures.copyrights[0];
    const suffix = copyright ? `--${copyright}` : '';
    return `${path}--${pad(index + 1)}${suffix}.jpg`;
  });

  return (
    <div classNames={styles.root} {...divAttrs}>
      {imgs.map((src, index) => {
        const photo = String(index + 1);
        return (
          <Link key={index} to={Project[id]} params={{ photo }} preventScrollReset>
            <img src={src} className={styles.thumbnail} />
          </Link>
        );
      })}
      <ProjectViewer photoIndex={photoIndex} project={project} />
    </div>
  );
};

export const ProjectThumbnailGrid = Screen_Project_ThumbnailGrid;
