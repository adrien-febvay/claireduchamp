import { useTranslation } from 'react-i18next';
import { Image as ImageAtom } from '@/gui/atoms/Image';

import fr from '@/gui/locales/projects-fr';
import en from '@/gui/locales/projects-en';

const projects = { fr, en };

const namespace = 'molecules/Intro';

export function Molecule_Intro_Image(props: Props) {
  const { landscape, portrait, projectId, pictureKey, ...imgProps } = props;
  const [translate, i18n] = useTranslation(namespace);

  const { caption, pictures, title } = projects[i18n.lang][projectId];
  const orientation = landscape ? ('landscape' as const) : ('portrait' as const);

  const src = `/img/intro/claire-duchamp-${pictures.basename}--${orientation}-${pictureKey}--©JulieMasson.jpg`;
  const alt = `${title} - ${caption} - ${translate(orientation)} ${pictureKey}`;

  return <ImageAtom src={src} alt={alt} {...imgProps} />;
}

export const Image = Molecule_Intro_Image;
