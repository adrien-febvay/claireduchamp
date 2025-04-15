import { Switch } from '@/gui/atoms/Switch';
import { useFading } from '@/gui/hooks/useFading';
import { useTranslation } from '@/utils/i18n';
import { CookieConsentContext as Context } from './Context';
import { CookieConsentProvider as Provider } from './Provider';
import { useOpenDialog } from './useOpenDialog';
import { useSetHidden } from './useSetHidden';
import { useUserChoice } from './useUserChoice';

import styles from './styles.scss';

const namespace = 'molecules/CookieConsent';

export const Molecule_CookieConsent = () => {
  const [userChoice, setAndSaveUserChoice, setHandle] = React.useContext(Context);

  const [allowAudience, setAllowAudience] = React.useState(userChoice !== 'deny');
  const [hidden, setHidden] = React.useState(false);

  const [bannerStyle, toggleBanner] = useFading();
  const [dialogStyle, toggleDialog] = useFading();

  React.useEffect(createHandle, []);
  React.useEffect(toggleDisplay, [hidden]);

  function createHandle() {
    setHandle?.({ openDialog, setHidden });
  }

  function accept() {
    handleUserChoice('accept');
  }

  function deny() {
    handleUserChoice('deny');
  }

  function handleUserChoice(value: UserChoice) {
    setAllowAudience(value !== 'deny');
    setAndSaveUserChoice?.(value);
    toggleBanner(false);
    toggleDialog(false);
  }

  function more() {
    toggleBanner(false);
    toggleDialog(true);
  }

  function openDialog() {
    toggleDialog(true);
  }

  function save() {
    if (allowAudience) {
      accept?.();
    } else {
      deny?.();
    }
  }

  function toggleDisplay() {
    if (userChoice) {
      toggleBanner(false);
      toggleDialog(false);
    } else if (dialogStyle.display) {
      toggleBanner(!hidden);
    }
  }

  const [translate] = useTranslation(namespace);

  return bannerStyle.display && dialogStyle.display ? null : (
    <>
      <div className={styles.bannerContainer} style={{ ...bannerStyle }}>
        <div className={styles.banner}>
          <div>
            {translate('banner-text')}{' '}
            <button className={styles.discreetButton} onClick={more}>
              {translate('more')}
            </button>
          </div>
          <button className={styles.obviousButton} onClick={accept}>
            {translate('accept')}
          </button>
        </div>
      </div>
      <div className={styles.dialogContainer} style={{ ...dialogStyle }}>
        <div className={styles.dialog}>
          <div>{translate('dialog-text')}</div>
          <button className={styles.obviousButton} onClick={accept}>
            {translate('accept-all')}
          </button>
          <div className={styles.dialogGrid}>
            <div className={styles.dialogLabel}>{translate('functional-label')}</div>
            <div>
              <Switch className={styles.dialogSwitch} checked disabled />
            </div>
            <div className={styles.dialogStatus}>{translate('required')}</div>
            <div className={styles.dialogDesc}>{translate('functional-text')}</div>
            <div className={styles.dialogLabel}>{translate('audience-label')}</div>
            <div className={styles.dialogSwitch}>
              <Switch className={styles.dialogSwitch} checked={allowAudience} onToggle={setAllowAudience} />
            </div>
            <div className={styles.dialogStatus}>{translate(allowAudience ? 'active' : 'inactive')}</div>
            <div className={styles.dialogDesc}>{translate('audience-text')}</div>
          </div>
          <div className={styles.dialogDualLine}>
            <div className={styles.discreetButtonContainer}>
              <button className={styles.discreetButton} onClick={deny}>
                {translate('essentials-only')}
              </button>
            </div>
            <button className={styles.obviousButton} onClick={save}>
              {translate('save')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const CookieConsent = Object.assign(Molecule_CookieConsent, {
  Context,
  Provider,
  useOpenDialog,
  useSetHidden,
  useUserChoice,
});
