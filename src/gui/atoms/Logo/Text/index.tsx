import { useTranslation } from 'react-i18next';

import ownStyles from './styles.scss';

export const Atom_Logo_Text: React.FC<Props> = (props) => {
  const { styles, ...divAttrs } = props;
  const [translate] = useTranslation('atoms/Logo/Text');
  const allStyles = React.extendStyles(ownStyles, styles);

  return (
    <div classNames={allStyles.text} {...divAttrs}>
      <div classNames={allStyles.title}>Claire Duchamp</div>
      <div classNames={allStyles.subtitle}>{translate('architect')}</div>
    </div>
  );
};

export const LogoText = Atom_Logo_Text;
