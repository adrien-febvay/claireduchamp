import type { Project } from '@/gui/screens/Project';
import type { ProjectCoverText as Component } from '.';
import type ownStyles from './styles.scss';

declare module '.' {
  namespace ProjectCoverText {
    /** <ProjectCoverText> handle. */
    type Handle = {
      /** Root <div> element reference.*/
      rootRef: React.RefObject<HTMLDivElement>;
    };

    type Props = Omit<React.DivAttributes, 'children'> &
      React.Styles<typeof ownStyles> & {
        /** Project to display. */
        project: Project.Data[Project.Id];
      };
  }

  type Handle = Component.Handle;

  type Props = Component.Props;
}
