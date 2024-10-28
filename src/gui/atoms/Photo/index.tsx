import styles from './styles.scss';

export const Atom_Photo: React.FC<Props> = (props) => {
  const { className, credit, href, src, ...imgAttrs } = props;

  return (
    <div classNames={[styles.container, className]}>
      <img className={styles.img} src={`/img${src}`} {...imgAttrs} />
      {credit && href && (
        <a classNames={[styles.credit, 'no-scaling']} href={href}>
          ©{credit}
        </a>
      )}
    </div>
  );
};

export const Photo = Atom_Photo;
