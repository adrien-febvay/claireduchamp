import useStyles from 'isomorphic-style-loader/useStyles';
import { Button } from './Button';

import styles from './styles.scss';

export const Molecule_Language: React.FC<Props> = (props) => {
  useStyles(styles);

  return (
    <div {...props}>
      <Button code="fr" name="French" />
      <span className={styles.slash}>/</span>
      <Button code="en" name="English" />
    </div>
  );
};

export const Language = Molecule_Language;
