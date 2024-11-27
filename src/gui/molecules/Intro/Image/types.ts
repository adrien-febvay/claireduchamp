import type { Image as ImageAtom } from '@/gui/atoms/Image';
import type { Image as Component } from '.';

import type fr from '@/gui/locales/projects-fr';
import type en from '@/gui/locales/projects-en';

declare module '.' {
  namespace Image {
    type Props = ImageAtom.Props &
      Orientation & {
        projectId: Project.Id;
        pictureKey: number | string;
      };

    type Orientation =
      | {
          landscape: true;
          portrait?: undefined;
        }
      | {
          landscape?: undefined;
          portrait: true;
        };
  }

  type Props = Component.Props;

  namespace Project {
    type IsValid<Project extends Fr[keyof Fr] | En[keyof En]> = Project['title'] extends string
      ? Project['pictures']['count'] extends 0
        ? never
        : string
      : never;

    type Fr = typeof fr;

    namespace Fr {
      type Id = { [Key in keyof Fr]: IsValid<Fr[Key]> & Key }[keyof Fr];
    }

    type En = typeof en;

    namespace En {
      type Id = { [Key in keyof En]: IsValid<En[Key]> & Key }[keyof En];
    }

    type Id = Fr.Id & En.Id;
  }
}
