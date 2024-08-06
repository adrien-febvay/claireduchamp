import useStyles from 'isomorphic-style-loader/useStyles';
import Markdown from 'markdown-to-jsx';
import { useTranslation } from 'react-i18next';
import { Link } from '@/gui/atoms/Link';
import { Mail } from '@/gui/atoms/Mail';
import { Phone } from '@/gui/atoms/Phone';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/LegalNotice';

const markdownOptions = { wrapper: Fragment, overrides: { Link, Mail, Phone } };

export const Screen_LegalNotice: React.FC = () => {
  useStyles(styles, navStyles);

  const [translate] = useTranslation(namespace);

  return (
    <article classNames={[styles.root, appStyles.lightTheme]}>
      <div className={styles.content}>
        <Markdown options={markdownOptions}>{translate('content')}</Markdown>
      </div>
    </article>
  );
};

export const LegalNotice = Object.assign(Screen_LegalNotice, {
  navStyles,
  route: route.fromLocales(namespace, { noFollow: true }),
} as const);
