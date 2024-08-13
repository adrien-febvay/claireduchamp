import { _ } from '@/utils/types';

import { classUnion } from '@/utils/dom/classUnion';

/**
 * Add classes to an element.
 * @param els Element(s) to add classes to.
 * @param classNames Classes to add.
 */
export function addClass<Elements extends addClass.Elements>(
  els: Elements,
  ...classNames: _.Optional<string>[]
): Elements;

export function addClass<Element extends addClass.Element>(el: Element, ...classNames: _.Optional<string>[]): Element;

export function addClass(els: addClass.Elements, ...classNames: _.Optional<string>[]): addClass.Elements {
  function addClass(el: addClass.Element) {
    if (React.isValidElement<_.Dict>(el) && (el.props.className === void 0 || typeof el.props.className === 'string')) {
      return React.cloneElement(el, { className: classUnion(el.props.className, ...classNames) });
    } else {
      if (typeof Element !== 'undefined' && el instanceof Element) {
        el.className = classUnion(el.className, ...classNames);
      }
      return el;
    }
  }

  return _.isIterable(els) ? [...els].map(addClass) : addClass(els);
}
