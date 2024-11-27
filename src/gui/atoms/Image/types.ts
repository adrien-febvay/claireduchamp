import type ownStyles from './styles.scss';

declare module '.' {
  namespace Image {
    type Props = React.ImageAttributes &
      React.Styles<typeof ownStyles & { loading?: string; loaded?: string }> & {
        fadeIn?: boolean;
        onLoadError?: (this: void, event: Event | string | null) => void;
        onFadedIn?: (this: void) => void;
        onLoadSuccess?: (this: void, event: Event | null) => void;
        spanAttrs?: React.SpanAttributes;
      };
  }

  type Props = Image.Props;
}
