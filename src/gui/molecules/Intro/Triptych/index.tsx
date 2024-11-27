import { Image } from '../Image';

export function Molecule_Intro_Triptych(props: Props) {
  const { pictureKey, ...imgProps } = props;
  return (
    <div>
      {[...Array<undefined>(3)].map((_na, subindex) => (
        <Image key={subindex} landscape pictureKey={`${pictureKey}-${subindex + 1}`} {...imgProps} />
      ))}
    </div>
  );
}

export const Triptych = Molecule_Intro_Triptych;
