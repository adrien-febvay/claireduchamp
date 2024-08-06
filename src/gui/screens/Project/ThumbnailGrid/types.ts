import type { Project } from '@/gui/screens/Project';
import type { ProjectThumbnailGrid as Component } from '.';

declare module '.' {
  namespace ProjectThumbnailGrid {
    type Props = React.DivAttributes &
      React.RefAttributes<HTMLDivElement> & {
        /** Index of the photo to show. */
        photoIndex: number;

        /** Project to display. */
        project: Project.Data[Project.Id] & {
          /** Project ID. */
          id: Project.Id;

          /** French pathname. */
          pathnameFr: string;
        };
      };
  }

  type Props = Component.Props;
}
