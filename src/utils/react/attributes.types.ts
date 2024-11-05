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

  /** `<form>` attributes (shortcut). */
  type FormAttributes = FormHTMLAttributes<HTMLFormElement>;

  /** `<img>` attributes (shortcut). */
  type ImageAttributes = ImgHTMLAttributes<HTMLImageElement>;

  /** `<select>` attributes (shortcut). */
  type SelectAttributes = SelectHTMLAttributes<HTMLSelectElement>;

  /** `<span>` attributes (shortcut). */
  type SpanAttributes = HTMLAttributes<HTMLSpanElement>;
}
