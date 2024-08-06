import type { Screen } from '@/gui/screens';
import type { Language } from '@/utils/i18n';
import type { Project as Component } from '.';
import type { projects } from './projects';

declare module '.' {
  type Params = { id: Project.Id; photo: string | undefined };

  type Project = typeof Component;

  namespace Project {
    type Id = Screen.Meta.Filter<Data>;

    type Data = projects[Language];

    namespace Data {
      type En = typeof projects.en;

      type Fr = typeof projects.fr;

      type Id = keyof Data;
    }
  }
}
