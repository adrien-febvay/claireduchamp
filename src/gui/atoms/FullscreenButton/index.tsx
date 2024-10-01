import styles from './styles.scss';

export const Atom_FullscreenButton = React.forwardRef<Handle, Props>(({ revoke, ...buttonAttrs }, ref) => (
  <button ref={ref} classNames={[styles.root, revoke ? styles.revoke : styles.enter]} {...buttonAttrs}>
    <div className={styles.arrow} />
    <div className={styles.arrow} />
    <div className={styles.arrow} />
    <div className={styles.arrow} />
  </button>
));

export const FullscreenButton = Atom_FullscreenButton;
