import type { Photo as Component } from '.';

declare module '.' {
  namespace Photo {
    type Props = React.ImageAttributes &
      Required<Pick<React.AnchorAttributes, 'href'>> & {
        /** Photography credit. */
        credit: string;
      };
  }

  type Props = Component.Props;
}
