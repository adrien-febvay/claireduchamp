import { Button } from './Button';

import styles from './styles.scss';

export const Molecule_Language: React.FC<Props> = (props) => (
  <div {...props}>
    <Button code="fr" name="French" />
    <span className={styles.slash}>/</span>
    <Button code="en" name="English" />
  </div>
);

export const Language = Molecule_Language;
