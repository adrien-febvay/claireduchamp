import styles from './styles.scss';

export const Atom_Switch = (props: Props) => {
  const { checked, onClick, onToggle, ...buttonAttrs } = props;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onToggle?.(!checked);
    onClick?.(event);
  }

  return (
    <button classNames={[styles.plate, checked && styles.on]} onClick={handleClick} {...buttonAttrs}>
      <div className={styles.underneath} />
      <div className={styles.left} />
      <div className={styles.right} />
      <div className={styles.slit} />
      <div className={styles.button} />
      <div className={styles.highlightButton} />
    </button>
  );
};

export const Switch = Atom_Switch;
