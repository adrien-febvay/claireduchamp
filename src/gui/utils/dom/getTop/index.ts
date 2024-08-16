/**
 * Get the top coordinate of an element relative to the document.
 * @param el Element to get the coordinate from, or its selector.
 * @returns A number if `el` is indeed an element, `null` when it is nullish.
 */
export function getTop(el: Element): number;
export function getTop(el: Element | string | null | undefined): number | null;
export function getTop(el: Element | string | null | undefined): number | null {
  const target = typeof el === 'string' ? document?.querySelector(el) : el;
  if (document && target) {
    const top = target.getBoundingClientRect().top;
    const scrollTop = document.documentElement.scrollTop ?? document.body.scrollTop;
    const clientTop = document.documentElement.clientTop ?? document.body.clientTop ?? 0;
    return Math.floor(top + scrollTop - clientTop);
  } else {
    return null;
  }
}
