import { route } from '@/gui/screens/route';
import { useTranslation } from '@/utils/i18n';

import appStyles from '@/gui/styles.scss';
import navStyles from './nav.scss';
import styles from './styles.scss';

import en from '@/gui/locales/press-en';
import fr from '@/gui/locales/press-fr';

const namespace = 'Screens/Press';
const baseImageUrl = '/img/press';

/** Press articles translations. */
const articles = { en, fr };

export const Screen_Press: React.FC = () => {
  const [, { lang }] = useTranslation(namespace);

  return (
    <article classNames={[appStyles.lightTheme, styles.article]}>
      <div className={styles.content}>
        {articles[lang].map((item, index) => (
          <div className={styles.item} key={index}>
            <a className={styles.link} href={item.link.href} target="_blank">
              <h3>{item.mediaName}</h3>
              <div className={styles.thumbnails}>
                {item.thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    className={styles.thumbnail}
                    src={`${baseImageUrl}/${thumbnail.src}`}
                    alt={thumbnail.alt}
                    width={thumbnail.width}
                    style={{ aspectRatio: `${thumbnail.width}/${thumbnail.height}` }}
                  />
                ))}
              </div>
              <div>{item.link.label}</div>
            </a>
          </div>
        ))}
      </div>
    </article>
  );
};

export const Press = Object.assign(Screen_Press, {
  route: route.fromLocales(namespace),
  navStyles,
} as const);
