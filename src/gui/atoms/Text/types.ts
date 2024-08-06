import type { Text as Component } from '.';

declare module '.' {
  namespace Text {
    type Props = Omit<React.SpanAttributes, 'children'> & {
      /** Content. */
      content: string;

      /** HTML content? */
      html?: boolean;
    };
  }

  type Props = Component.Props;
}
