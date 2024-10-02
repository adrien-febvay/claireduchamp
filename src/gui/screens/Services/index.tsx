import parse from 'html-react-parser';
import { Trans, useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';
import { Map } from '@/gui/atoms/Map';
import { Text } from '@/gui/atoms/Text';
import { Intro } from '@/gui/molecules/Intro';
import { Project } from '@/gui/screens/Project';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

const namespace = 'Screens/Services';

/** Business values to display. */
const VALUES = ['listening', 'reactivity', 'singularity'] as const;

export const Screen_Services: React.FC = () => {
  const [translate] = useTranslation(namespace);

  return (
    <>
      <Intro />
      <article classNames={[appStyles.lightTheme, styles.article]}>
        <div id="services" className={styles.content}>
          <h2 className={styles.servicesTitle}>{translate('our-services')}</h2>
          <h3 className={styles.servicesCaption}>{translate('our-services-caption')}</h3>
          <ul className={styles.services}>
            <Map content={translate('our-services-items')} separator={/\s*;\s*/} children={<li />} />
          </ul>
          <Text content={translate('explanation')} />
          <Link to={screens.ContactUs} classNames={[appStyles.scaledButton, styles.button]}>
            <Trans t={translate} i18nKey="use-our-services">
              <span className={styles.noWrap} />
            </Trans>
          </Link>
          <Project.Preview projectId="villaGrandvaux2023" tryptics={[[2, 17, 3]]} className={styles.project} />
          <Project.Preview projectId="villaGrandvaux2023" tryptics={[[15, 30, 6]]} className={styles.project} credits />
          <h2 className={styles.catchphrase}>{translate('catchphrase')}</h2>
          <h3 className={styles.introduction}>{parse(translate('introduction'))}</h3>
          <div className={styles.values}>
            {VALUES.map((value, index) => (
              <div key={index} className={styles.value}>
                <h3>{translate(`${value}-caption`)}</h3>
                <Text content={translate(`${value}-text`)} />
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export const Services = Object.assign(Screen_Services, {
  intro: false,
  route: route.fromLocales(namespace),
} as const);
