import { useTranslation } from 'react-i18next';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { padFor } from './utils';

import projects from '@/gui/locales/projects-fr';

import ownStyles from './styles.scss';

const name = 'Screens/Project/Preview';

export const Screen_Project_Preview: React.FC<Props> = (props) => {
  const { credits, tryptics, ...moreProps } = props;
  const { styles, ...divAttrs } = moreProps;
  const [translate] = useTranslation(name);
  const allStyles = React.extendStyles(ownStyles, styles);
  return (
    <div classNames={allStyles.root} {...divAttrs}>
      {tryptics.map((trypticPictures, trypticIndex) => (
        <div key={trypticIndex} className={allStyles.triptych}>
          {trypticPictures.map(([projectId, picture]) => {
            const { pictures } = projects[projectId];
            const copyrights: Dict<string> | null = pictures.copyrights;
            const copyright = copyrights[picture] ?? pictures.copyrights[0];
            const path = `/img/projects/claire-duchamp-${pictures.basename}`;
            const suffix = copyright ? `--${copyright}` : '';
            const pad = padFor(pictures.count);
            return (
              <Link key={picture} to={Project[projectId]} params={{ photo: String(picture) }}>
                <img src={`${path}--${pad(picture)}-thumbnail${suffix}.jpg`} />
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
