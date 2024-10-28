import { url } from '../utils';

export function Molecule_Intro_Triptych({ project, index }: { project: string; index: number }) {
  return (
    <div>
      {[...Array<undefined>(3)].map((_na, subindex) => (
        <img key={subindex} src={url(project, `landscape-${index}-${subindex + 1}`)} />
      ))}
    </div>
  );
}

export const Triptych = Molecule_Intro_Triptych;
