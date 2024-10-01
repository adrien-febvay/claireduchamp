import LeftArrowSvg from '@/gui/assets/svg/left-arrow.svg';

import styles from './styles.scss';

export const Atom_LeftArrowButton = React.forwardRef<Handle, Props>((props, ref) => {
  return (
    <button classNames={styles.root} ref={ref} {...props}>
      <LeftArrowSvg />
    </button>
  );
});

export const LeftArrowButton = Atom_LeftArrowButton;
