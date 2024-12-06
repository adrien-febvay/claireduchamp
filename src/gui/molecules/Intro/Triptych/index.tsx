import { Image } from '../Image';

import styles from './styles.scss';

export function Molecule_Intro_Triptych(props: Props) {
  const { pictureKey, ...imgProps } = props;
  return (
    <div className={styles.root}>
      {[...Array<undefined>(3)].map((_na, subindex) => {
        const pictureSubkey = `${pictureKey}-${subindex + 1}`;
        return <Image key={subindex} className={styles.image} landscape pictureKey={pictureSubkey} {...imgProps} />;
      })}
    </div>
  );
}

export const Triptych = Molecule_Intro_Triptych;
