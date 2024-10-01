import Markdown from 'markdown-to-jsx';
import { Link, screens } from '@/gui/atoms/Link';
import { Text } from '@/gui/atoms/Text';
import { JulieMasson } from '@/gui/atoms/Photo/JulieMasson';
import { route } from '@/gui/screens/route';
import { useTranslation } from '@/utils/i18n';

import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

const namespace = 'Screens/AboutUs';

export const Screen_AboutUs: React.FC = () => {
  const [translate] = useTranslation(namespace);

  return (
    <article>
      <div classNames={[appStyles.darkTheme, styles.introductionContainer]}>
        <div className={styles.content}>
          <div className={styles.introductionGrid}>
            <JulieMasson className={styles.introductionPhoto} src="/about/claire-duchamp.jpg" />
            <div className={styles.introductionText}>
              <Text content={translate('introduction')} />
            </div>
          </div>
          <Link to={screens.ContactUs} classNames={[appStyles.scaledButton, styles.button]}>
            {translate('hire-cd')}
          </Link>
        </div>
      </div>
      <div classNames={[appStyles.lightTheme, styles.resumeContainer]}>
        <div className={styles.content}>
          <div className={styles.resumeGrid}>
            <div classNames={styles.career}>
              <Markdown options={{ wrapper: Fragment }}>{translate('career')}</Markdown>
            </div>
            <div classNames={styles.references}>
              <Markdown options={{ wrapper: Fragment }}>{translate('references')}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const AboutUs = Object.assign(Screen_AboutUs, {
  route: route.fromLocales(namespace),
} as const);
