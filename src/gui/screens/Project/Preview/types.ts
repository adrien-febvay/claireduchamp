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

        /** Number of picture rows to show. */
        tryptics: Tryptic[];
      };

    type Picture = [projectId: Project.Id, imageIndex: number];

    type Tryptic = [Picture, Picture, Picture];
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
