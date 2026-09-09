import { useTranslation } from 'react-i18next';
import { arrayGen } from '@/gui/utils/array/gen';
import { pad as padNumber } from '@/gui/utils/number/pad';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { ProjectViewer } from '@/gui/screens/Project/Viewer';

import styles from './styles.scss';

const BASEPATH = '/img/projects/claire-duchamp';

export const Screen_Project_ThumbnailGrid: React.FC<Props> = (props) => {
  const { photoIndex, project, ...divAttrs } = props;

  const [translate] = useTranslation(Project.namespace);

  const { caption, id, pictures, title } = project;
  const copyrights: Dict<string> | null = pictures.copyrights;
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

  return (
    <div classNames={styles.root} {...divAttrs}>
      {imgs.map((imgAttrs, index) => {
        const photo = String(index + 1);
        return (
          <Link key={index} to={Project[id]} params={{ photo }} preventScrollReset>
            <img className={styles.thumbnail} {...imgAttrs} />
          </Link>
        );
      })}
      <ProjectViewer photoIndex={photoIndex} project={project} />
    </div>
  );
};

export const ProjectThumbnailGrid = Screen_Project_ThumbnailGrid;
