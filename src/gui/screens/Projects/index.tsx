import { useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';
import { Project } from '@/gui/screens/Project';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

import en from '@/gui/locales/projects-en';
import fr from '@/gui/locales/projects-fr';

const namespace = 'Screens/Projects';
const baseImageUrl = '/img/projects/claire-duchamp';

/** Projects translations. */
const projects = { en: Object.entries(en), fr: Object.entries(fr) };

/** Ensures an element won't be glitchy at the end of its animation. */
function onAnimationEnd(event: React.AnimationEvent<HTMLElement>): void {
  event.currentTarget.style.animation = 'none';
  event.currentTarget.style.opacity = '1';
}

export const Screen_Projects: React.FC = () => {
  const [translate, { lang }] = useTranslation(namespace);

  return (
    <article classNames={[appStyles.lightTheme, styles.article]}>
      <div className={styles.content}>
        {projects[lang].map(([id, project], index) => {
          const { basename, copyrights } = project.pictures ?? {};
          const suffix = copyrights[0] ? `--${copyrights[0]}` : '';
          const imageUrl = basename && `${basename}--thumbnail${suffix}.jpg`;
          const backgroundImage = imageUrl && `url(${baseImageUrl}-${imageUrl})`;
          const props = {
            className: styles.project,
            key: index,
            onAnimationEnd,
            style: { animationDelay: `${index * 250}ms` },
            children: (
              <>
                <div className={styles.thumbnail} style={{ backgroundImage }} />
                <div className={styles.text}>
                  <h2>{project.caption}</h2>
                  <h3>{project.title ?? translate('in-progress')}</h3>
                  {project.description && <h4>{project.description}</h4>}
                </div>
              </>
            ),
          };
          const route = id === 'contactUs' ? screens.ContactUs : Project[id as Project.Id];
          return route ? <Link to={route} {...props} /> : <div {...props} title={translate('coming-soon')} />;
        })}
      </div>
    </article>
  );
};

export const Projects = Object.assign(Screen_Projects, {
  route: route.fromLocales(namespace),
  navStyles,
} as const);
