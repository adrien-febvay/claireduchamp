import type { _ } from '@/utils/types';

import { Link, screens } from '@/gui/atoms/Link';
import { CookieConsent } from '@/gui/molecules/CookieConsent';
import { useTranslation, Resources } from '@/utils/i18n';
import { instagram, linkedin } from './utils';

import ownStyles from './styles.scss';

export const Molecule_Footer: React.FC<Props> = ({ styles }) => {
  const [translate] = useTranslation('molecules/Footer');
  const allStyles = React.extendStyles(ownStyles, styles);
  const openCookieConsentDialog = CookieConsent.useOpenDialog();

  type Translation = keyof Resources['molecules/Footer'];
  type ClassName = keyof typeof ownStyles;
  type Key = Translation & ClassName;

  function link(key: Key, to: Link.Props['to'] | _.Function<[], void> | undefined, label?: string): React.Node {
    return (
      <div classNames={[allStyles.item, allStyles[key]]}>
        {label && `${translate(key)} `}
        {to === void 0 || to instanceof Function ? (
          <button onClick={to} classNames={[allStyles.link, allStyles[key]]}>
            {label ?? translate(key)}
          </button>
        ) : (
          <Link to={to} classNames={[allStyles.link, allStyles[key]]}>
            {label ?? translate(key)}
          </Link>
        )}
      </div>
    );
  }
  return (
    <footer className={allStyles.root}>
      <div classNames={allStyles.container}>
        <div className={allStyles.socialMedias}>
          {link('instagram', instagram('claire_duchamp_architect'))}
          {link('linkedin', linkedin('claire-duchamp-4904b6a5'))}
        </div>
        <div className={allStyles.legalInformationContainer}>
          <div className={allStyles.legalInformation}>
            {link('cookies', openCookieConsentDialog)}
            {link('legal-notice', screens.LegalNotice)}
            {link('privacy-policy', screens.PrivacyPolicy)}
          </div>
          <div className={allStyles.address}>
            <Link className={allStyles.addressLink} to="https://maps.app.goo.gl/b26oyumKkiTRXwmQA">
              <span className={allStyles.addressLine}>Claire Duchamp Architecte</span>
              <span className={allStyles.addressLine}>Rue de la Clergère 2</span>
              <span className={allStyles.addressLine}>CH-1800 Vevey</span>
            </Link>
          </div>
        </div>
        <div className={allStyles.credits}>
          {link('photography', 'http://www.juliemasson.ch/', 'Julie Masson')}
          {link('website', linkedin('adrien-febvay'), 'Adrien Febvay')}
        </div>
      </div>
    </footer>
  );
};

export const Footer = Molecule_Footer;
