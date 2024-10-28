import { useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';
import { useParams } from '@/gui/hooks/useParams';
import { articles } from '@/gui/locales/blog';
import { Content } from './Content';
import { routes } from './routes';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/Article';

export function Screen_Article() {
  const [translate] = useTranslation(namespace);
  const { id } = useParams<Params>();

  return (
    <article classNames={[styles.root, appStyles.lightTheme]}>
      <div className={styles.content}>
        <Link to={screens.Blog} className={styles.backToBlog}>
          {translate('back-to-blog')}
        </Link>
        <Content text={articles[id].content} />
      </div>
    </article>
  );
}

export const Article = Object.assign(Screen_Article, {
  namespace,
  navStyles,
  subroutes: Object.values(routes),
  ...routes,
});
