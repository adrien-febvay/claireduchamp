import type { ProjectThumbnailGrid } from '@/gui/screens/Project/ThumbnailGrid';
import type { ProjectViewer as Component } from '.';

declare module '.' {
  namespace ProjectViewer {
    type Props = React.DivAttributes &
      React.RefAttributes<HTMLDivElement> & {
        /** Index of the photo to show. */
        photoIndex: number;

        /** Project to display. */
        project: ProjectThumbnailGrid.Props['project'];
      };
  }

  type Props = Component.Props;
}
