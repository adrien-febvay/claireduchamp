// TypeScript issue: at least one import/export is required.
export {};

declare module 'react' {
  /** `<div>` attributes (shortcut). */
  type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;

  /** `<button>` attributes (shortcut). */
  type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

  /** `<div>` attributes (shortcut). */
  type DivAttributes = HTMLAttributes<HTMLDivElement>;

  /** `<dl>` attributes (shortcut). */
  type DListAttributes = HTMLAttributes<HTMLDListElement>;

  /** `<img>` attributes (shortcut). */
  type ImageAttributes = ImgHTMLAttributes<HTMLImageElement>;

  /** `<span>` attributes (shortcut). */
  type SpanAttributes = HTMLAttributes<HTMLSpanElement>;
}
