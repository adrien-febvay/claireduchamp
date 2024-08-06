import useStyles from 'isomorphic-style-loader/useStyles';

import CrossSvg from '@/gui/assets/svg/cross.svg';

import styles from './styles.scss';

export const Atom_CloseButton = React.forwardRef<Handle, Props>((props, ref) => {
  useStyles(styles);

  return (
    <button classNames={styles.root} ref={ref} {...props}>
      <CrossSvg />
    </button>
  );
});

export const CloseButton = Atom_CloseButton;
