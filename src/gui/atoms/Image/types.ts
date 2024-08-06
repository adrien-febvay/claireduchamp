import type ownStyles from './styles.scss';

declare module '.' {
  namespace Image {
    type Props = React.ImageAttributes &
      React.Styles<typeof ownStyles & { loading?: string; loaded?: string }> & {
        fadeIn?: boolean;
        spanAttrs?: React.SpanAttributes;
      };
  }

  type Props = Image.Props;
}
