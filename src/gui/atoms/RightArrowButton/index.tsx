import useStyles from 'isomorphic-style-loader/useStyles';

import RightArrowSvg from '@/gui/assets/svg/right-arrow.svg';

import styles from './styles.scss';

export const Atom_RightArrowButton = React.forwardRef<Handle, Props>((props, ref) => {
  useStyles(styles);
  return (
    <button classNames={styles.root} ref={ref} {...props}>
      <RightArrowSvg />
    </button>
  );
});

export const RightArrowButton = Atom_RightArrowButton;
