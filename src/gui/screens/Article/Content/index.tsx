import Markdown from 'markdown-to-jsx';
import { Link } from '@/gui/atoms/Link';

import styles from './styles.scss';

const markdownOptions = { wrapper: Fragment, overrides: { Link } };

export function Screen_Article_Content({ text }: Props) {
  return (
    <div className={styles.root}>
      <Markdown options={markdownOptions}>{text}</Markdown>
    </div>
  );
}

export const Content = Screen_Article_Content;
