import { useTranslation } from 'react-i18next';

import ownStyles from './styles.scss';

export const Atom_Logo_Text: React.FC<Props> = (props) => {
  const { h1, styles, ...tagAttrs } = props;
  const [translate] = useTranslation('atoms/Logo/Text');
  const allStyles = React.extendStyles(ownStyles, styles);

  return React.createElement(
    h1 ? 'h1' : 'div',
    { ...tagAttrs, classNames: allStyles.text },
    <div classNames={allStyles.title}>Claire Duchamp</div>,
    <div classNames={allStyles.subtitle}>{translate('architect')}</div>,
  );
};

export const LogoText = Atom_Logo_Text;
