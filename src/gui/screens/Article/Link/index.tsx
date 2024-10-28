import Markdown from 'markdown-to-jsx';
import { useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';
import { articles } from '@/gui/locales/blog';

import contentStyles from '../Content/styles.scss';

const namespace = 'Screens/Article/Link';

const markdownOptions = { wrapper: Fragment, overrides: { Link } };

export function Screen_Article_Link(props: Props) {
  const [translate] = useTranslation(namespace);
  const { articleId, ...divAttrs } = props;

  if (articleId) {
    const { title, description } = articles[articleId];
    return (
      <div classNames={[contentStyles.root]} {...divAttrs}>
        <h2>
          <Link to={screens.Article[articleId]}>{title}</Link>
        </h2>
        <p>
          <Markdown options={markdownOptions}>{description}</Markdown>
        </p>
        <p>
          <Link to={screens.Article[articleId]}>{translate('read-more')}</Link>
        </p>
      </div>
    );
  } else {
    return null;
  }
}

export const ArticleLink = Screen_Article_Link;
