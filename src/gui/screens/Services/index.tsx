import parse from 'html-react-parser';
import useStyles from 'isomorphic-style-loader/useStyles';
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
  useStyles(styles);
  const [translate] = useTranslation(namespace);

  return (
    <>
      <Intro />
      <article classNames={[appStyles.lightTheme, styles.article]}>
        <div className={styles.content}>
          <h1 className={styles.catchphrase}>{translate('catchphrase')}</h1>
          <div classNames={[appStyles.caption, styles.introduction]}>{parse(translate('introduction'))}</div>
          <div className={styles.values}>
            {VALUES.map((value, index) => (
              <div key={index} className={styles.value}>
                <h2>{translate(`${value}-caption`)}</h2>
                <Text content={translate(`${value}-text`)} />
              </div>
            ))}
          </div>
          <Project.Preview projectId="villaGrandvaux2023" tryptics={[[2, 17, 3]]} className={styles.project} />
          <Project.Preview
            id="services"
            projectId="villaGrandvaux2023"
            tryptics={[[15, 30, 6]]}
            className={styles.project}
            credits
          />
          <h1 className={styles.servicesTitle}>{translate('our-services')}</h1>
          <h2 className={styles.servicesCaption}>
            <Map content={translate('our-services-caption')} glue={<> –&nbsp;</>} separator=" – ">
              <span className={styles.servicesCaptionItem} />
            </Map>
          </h2>
          <ul className={styles.services}>
            <Map content={translate('our-services-items')} separator={/\s*;\s*/} children={<li />} />
          </ul>
          <Text content={translate('explanation')} />
          <Link to={screens.ContactUs} classNames={[appStyles.scaledButton, styles.button]}>
            <Trans t={translate} i18nKey="use-our-services">
              <span className={styles.noWrap} />
            </Trans>
          </Link>
        </div>
      </article>
    </>
  );
};

export const Services = Object.assign(Screen_Services, {
  intro: false,
  route: route.fromLocales(namespace),
} as const);
