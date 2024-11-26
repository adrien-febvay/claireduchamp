import { useTranslation, Trans } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';

import appStyles from '@/gui/styles.scss';
import footerStyles from './footer.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

const namespace = 'Screens/NotFound';

export const Screen_NotFound: React.FC = () => {
  const [translate] = useTranslation(namespace);
  const classNames = [appStyles.lightTheme, styles.container];

  return (
    <div classNames={classNames}>
      <div className={styles.content}>
        <h1>
          <Trans t={translate} i18nKey="not-found">
            <span className={styles.noWrap} />
          </Trans>
        </h1>
        <Link to={screens.Home}>
          <Trans t={translate} i18nKey="return-home">
            <span className={styles.noWrap} />
          </Trans>
        </Link>
      </div>
    </div>
  );
};

export const NotFound = Object.assign(Screen_NotFound, {
  namespace,
  footerStyles,
  navStyles,
  route: { mul: { pathname: '*' } },
} as const);
