import RightArrowSvg from '@/gui/assets/svg/right-arrow.svg';

import styles from './styles.scss';

export const Atom_RightArrowButton = React.forwardRef<Handle, Props>((props, ref) => (
  <button classNames={styles.root} ref={ref} {...props}>
    <RightArrowSvg />
  </button>
));

export const RightArrowButton = Atom_RightArrowButton;
