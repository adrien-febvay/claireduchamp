import { useTranslation } from 'react-i18next';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { padFor } from './utils';

import projects from '@/gui/locales/projects-fr';

import ownStyles from './styles.scss';

export const Screen_Project_Preview: React.FC<Props> = (props) => {
  const { credits, tryptics, ...moreProps } = props;
  const { styles, ...divAttrs } = moreProps;
  const [translate] = useTranslation(Project.namespace);
  const allStyles = React.extendStyles(ownStyles, styles);
  return (
    <div classNames={allStyles.root} {...divAttrs}>
      {tryptics.map((trypticPictures, trypticIndex) => (
        <div key={trypticIndex} className={allStyles.triptych}>
          {trypticPictures.map(([projectId, pictureNo]) => {
            const { caption, pictures, title } = projects[projectId];
            const copyrights: Dict<string> | null = pictures.copyrights;
            const copyright = copyrights[pictureNo] ?? pictures.copyrights[0];
            const path = `/img/projects/claire-duchamp-${pictures.basename}`;
            const suffix = copyright ? `--${copyright}` : '';
            const pad = padFor(pictures.count);
            const thumbnail = translate('thumbnail');
            return (
              <Link key={pictureNo} to={Project[projectId]} params={{ photo: String(pictureNo) }}>
                <img
                  src={`${path}--${pad(pictureNo)}-thumbnail${suffix}.jpg`}
                  alt={`${title} - ${caption} - ${thumbnail} ${pictureNo}`}
                />
              </Link>
            );
          })}
        </div>
      ))}
      {credits && (
        <div className={allStyles.credits}>
          {translate('photography')}
          &nbsp;
          <Link to="https://www.juliemasson.ch/">©JulieMasson</Link>
        </div>
      )}
    </div>
  );
};

export const Preview = Screen_Project_Preview;
