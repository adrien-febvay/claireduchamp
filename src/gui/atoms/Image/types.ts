import type ownStyles from './styles.scss';

declare module '.' {
  namespace Image {
    type Props = Omit<React.ImageAttributes, 'onError' | 'onLoad'> &
      React.Styles<typeof ownStyles & { loading?: string; loaded?: string }> & {
        fadeIn?: boolean;
        onError?: (this: void, event: Event | string | null) => void;
        onFadedIn?: (this: void) => void;
        onLoad?: (this: void, event: Event | null) => void;
        spanAttrs?: React.SpanAttributes;
      };
  }

  type Props = Image.Props;
}
