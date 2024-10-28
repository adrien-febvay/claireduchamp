import { Button } from './Button';
import buttonStyles from './Button/styles.scss';

export const Molecule_Language: React.FC<Props> = (props) => (
  <div classNames={buttonStyles.parent} {...props}>
    <Button code="fr" name="French" />
    <Button code="en" name="English" />
  </div>
);

export const Language = Molecule_Language;
