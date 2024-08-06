import useStyles from 'isomorphic-style-loader/useStyles';
import { useTranslation } from 'react-i18next';
import { Link } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { padFor } from './utils';

import projects from '@/gui/locales/projects-fr';

import ownStyles from './styles.scss';

const name = 'Screens/Project/Preview';

export const Screen_Project_Preview: React.FC<Props> = (props) => {
  useStyles(ownStyles);

  const { credits, projectId, tryptics = [[0, 1, 2]], ...moreProps } = props;
  const { styles, ...divAttrs } = moreProps;
  const { pictures } = projects[projectId];
  const copyrights: Dict<string> | null = pictures.copyrights;
  const [translate] = useTranslation(name);
  const path = `/img/projects/claire-duchamp-${pictures.basename}`;
  const pad = padFor(pictures.count);
  const allStyles = React.extendStyles(ownStyles, styles);
  return (
    <div classNames={allStyles.root} {...divAttrs}>
      {tryptics.map((trypticPictures, trypticIndex) => (
        <div key={trypticIndex} className={allStyles.triptych}>
          {trypticPictures.map((picture) => {
            const copyright = copyrights[picture] ?? pictures.copyrights[0];
            const suffix = copyright ? `--${copyright}` : '';
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
