import { useChangeLanguage } from '@/gui/hooks/useChangeLanguage';

import styles from './styles.scss';

export const Molecule_Language_Button: React.FC<Props> = ({ code, name }) => {
  const [changeLanguage, i18n] = useChangeLanguage(code);

  return (
    <button title={name} className={styles.el} disabled={code === i18n.lang} onClick={() => void changeLanguage()}>
      {code}
    </button>
  );
};

export const Button = Molecule_Language_Button;
