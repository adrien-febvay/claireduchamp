import type { _ } from '@/utils/types';
import type { Project } from '@/gui/screens/Project';
import type { ProjectSlideshow as Component } from '.';

declare module '.' {
  namespace ProjectSlideshow {
    type Props = {
      /** Get avalaible size for the component. */
      getAvailableSize: () => _.Size | null;

      /** Project to display. */
      project: Project.Data[Project.Id];

      /** Index of the photo to show. */
      photoIndex: number;
    };
  }

  type Props = Component.Props;
}
