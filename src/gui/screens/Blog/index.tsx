import { articleIds } from '@/gui/locales/blog';
import { ArticleLink } from '@/gui/screens/Article/Link';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/Blog';

function Screen_Blog() {
  return (
    <section classNames={[appStyles.lightTheme, styles.root]}>
      <div className={styles.content}>
        {articleIds.map((id, index) => (
          <Fragment key={id}>
            {index !== 0 && <hr className={styles.separator} />}
            <ArticleLink articleId={id} className={styles.article} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export const Blog = Object.assign(Screen_Blog, {
  namespace,
  navStyles,
  route: route.fromLocales(namespace),
});
