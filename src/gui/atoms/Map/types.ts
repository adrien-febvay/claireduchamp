import type { Map as Component } from '.';

declare module '.' {
  namespace Map {
    type Props = Omit<React.SpanAttributes, 'children'> & {
      /** Component template. */
      Component?: React.ComponentType<React.Children.Prop>;

      /** Element template. */
      children?: React.Element<React.Children.Prop>;

      /** Content. */
      content: string;

      /** Glue. */
      glue?: React.Node;

      /** HTML content? */
      html?: boolean;

      /** Separator. */
      separator?: string | RegExp;
    };
  }

  type Props = Component.Props;
}
