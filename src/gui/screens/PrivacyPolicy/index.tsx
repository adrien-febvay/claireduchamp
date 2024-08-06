import useStyles from 'isomorphic-style-loader/useStyles';
import Markdown from 'markdown-to-jsx';
import { useTranslation } from 'react-i18next';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/PrivacyPolicy';

export const Screen_PrivacyPolicy: React.FC = () => {
  useStyles(styles, navStyles);

  const [translate] = useTranslation(namespace);

  return (
    <article classNames={[styles.root, appStyles.lightTheme]}>
      <div className={styles.content}>
        <Markdown options={{ wrapper: Fragment }}>{translate('content')}</Markdown>
      </div>
    </article>
  );
};

export const PrivacyPolicy = Object.assign(Screen_PrivacyPolicy, {
  navStyles,
  route: route.fromLocales(namespace, { noFollow: true }),
} as const);
