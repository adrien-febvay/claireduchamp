import parse from 'html-react-parser';
import { Trans, useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';
import { Map } from '@/gui/atoms/Map';
import { Text } from '@/gui/atoms/Text';
import { useRouterContext } from '@/gui/hooks/useRouterContext';
import { Intro } from '@/gui/molecules/Intro';
import { Project } from '@/gui/screens/Project';
import { route } from '@/gui/screens/route';

import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

const namespace = 'Screens/Services';

/** Business values to display. */
const VALUES = ['listening', 'reactivity', 'singularity'] as const;

const ServiceItem = ({ children }: React.Children.Prop) => (
  <li>
    <h3>{children}</h3>
  </li>
);

export const Screen_Services: React.FC = () => {
  const { Screen } = useRouterContext();
  const [translate] = useTranslation(namespace);
  const titleTag = Screen === Services ? 'div' : 'h1';
  const titleProps = { classNames: [styles.servicesCaption, appStyles.h1] };

  return (
    <>
      <Intro />
      <article classNames={[appStyles.lightTheme, styles.article]}>
        <div id="services" className={styles.content}>
          {React.createElement(titleTag, titleProps, translate('our-services-caption'))}
          <h2 className={styles.servicesTitle}>{translate('our-services')}</h2>
          <ul className={styles.services}>
            <Map content={translate('our-services-items')} separator={/\s*;\s*/} Component={ServiceItem} />
          </ul>
          <Text content={translate('explanation')} />
          <Link to={screens.ContactUs} classNames={[appStyles.scaledButton, styles.button]}>
            <Trans t={translate} i18nKey="use-our-services">
              <span className={styles.noWrap} />
            </Trans>
          </Link>
          <Project.Preview
            className={styles.project}
            tryptics={[
              [
                ['chardonneApartment2024', 17],
                ['chardonneApartment2024', 26],
                ['villaGrandvaux2023', 30],
              ],
              [
                ['chardonneApartment2024', 35],
                ['lacustreLamp', 11],
                ['villaGrandvaux2023', 17],
              ],
            ]}
            credits
          />
          <h2 className={styles.catchphrase}>{translate('catchphrase')}</h2>
          <p className={styles.introduction}>{parse(translate('introduction'))}</p>
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
