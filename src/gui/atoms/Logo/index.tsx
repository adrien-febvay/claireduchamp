import { LogoImage } from './Image';
import { LogoText } from './Text';

import ownStyles from './styles.scss';

export const Atom_Logo: React.FC<Props> = (props) => {
  const { imageProps, styles, textProps, ...divAttrs } = props;
  const allStyles = React.extendStyles(ownStyles, styles);

  return (
    <div className={allStyles.root} {...divAttrs}>
      <LogoImage styles={allStyles} {...imageProps} />
      <LogoText styles={allStyles} {...textProps} />
    </div>
  );
};

export const Logo = Object.assign(Atom_Logo, {
  Image: LogoImage,
  Text: LogoText,
});
