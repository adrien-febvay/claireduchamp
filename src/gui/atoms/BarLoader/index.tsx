import useStyles from 'isomorphic-style-loader/useStyles';

import styles from './styles.scss';

export const Atom_BarLoader: React.FC<Props> = (props) => {
  useStyles(styles);

  return <div classNames={styles.root} {...props} />;
};

export const BarLoader = Atom_BarLoader;
