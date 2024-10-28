import { useChangeLanguage } from '@/gui/hooks/useChangeLanguage';

import styles from './styles.scss';

export const Molecule_Language_Button: React.FC<Props> = ({ code, name }) => {
  const [changeLanguage, i18n] = useChangeLanguage(code);
  const className = `${styles.el} no-scaling`;

  return (
    <button title={name} className={className} disabled={code === i18n.lang} onClick={() => void changeLanguage()}>
      {code}
    </button>
  );
};

export const Button = Molecule_Language_Button;
