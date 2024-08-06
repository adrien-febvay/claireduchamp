import type { Project } from '@/gui/screens/Project';
import type { Preview as Component } from '.';

import type ownStyles from './styles.scss';

declare module '.' {
  namespace Preview {
    /** <ProjectPreview> component properties. */
    type Props = Omit<React.DivAttributes, 'children'> &
      React.Styles<typeof ownStyles> & {
        /** Show credits? */
        credits?: boolean;

        /** Id of a project with pictures. */
        projectId: Project.Id;

        /** Number of picture rows to show. */
        tryptics?: Tryptic[];
      };

    type Tryptic = [number, number, number];
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
