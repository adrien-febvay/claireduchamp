import LogoSvg from '@/gui/assets/svg/logo.svg';

import ownStyles from './styles.scss';

const Atom_Logo_Image: React.FC<Props> = (props) => {
  const { className, styles, svgAttrs, ...divAttrs } = props;
  const allStyles = React.extendStyles(ownStyles, styles);

  return (
    <div classNames={[allStyles.container, className]} {...divAttrs}>
      <LogoSvg className={allStyles.image} {...svgAttrs} />
    </div>
  );
};

export const LogoImage = Atom_Logo_Image;
