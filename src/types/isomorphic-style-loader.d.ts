declare module 'isomorphic-style-loader/types' {
  export type Dispose = () => void;

  export type GetCSSItem = () => string;

  export type GetContent = () => string;

  export type InsertCssItem = () => Dispose;

  export type RemoveGlobalCss = () => void;

  export interface Style {
    [key: string]: InsertCssItem | GetCSSItem | GetContent | string;
    _insertCss: InsertCssItem;
    _getCss: GetCSSItem;
    _getContent: GetContent;
  }
}

declare module 'isomorphic-style-loader/useStyles' {
  export * from 'isomorphic-style-loader/types';

  function useStyles(...styles: object[]): void;

  export default useStyles;
}

declare module 'isomorphic-style-loader/StyleContext' {
  import type { Context } from 'react';

  import type { Style } from 'isomorphic-style-loader/types';

  export * from 'isomorphic-style-loader/types';

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  export type InsertCSS = (...styles: Style[]) => RemoveGlobalCss | void;

  export type RemoveGlobalCss = () => void;

  export interface StyleContextValue {
    insertCss: InsertCSS;
  }

  const StyleContext: Context<StyleContextValue>;

  export { StyleContext as default };
}
