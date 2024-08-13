import { _ } from '@/utils/types';

import { classDiff } from '@/utils/dom/classDiff';

/**
 * Add classes to an element.
 * @param els Element(s) to add classes to.
 * @param classNames Classes to add.
 */
export function removeClass<Elements extends removeClass.Elements>(
  els: Elements,
  ...classNames: _.Optional<string>[]
): Elements;

export function removeClass<Element extends removeClass.Element>(
  el: Element,
  ...classNames: _.Optional<string>[]
): Element;

export function removeClass(els: removeClass.Elements, ...classNames: _.Optional<string>[]): removeClass.Elements {
  function removeClass(el: removeClass.Element) {
    if (React.isValidElement<_.Dict>(el) && (el.props.className === void 0 || typeof el.props.className === 'string')) {
      return React.cloneElement(el, { className: classDiff(el.props.className, ...classNames) });
    } else {
      if (typeof Element !== 'undefined' && el instanceof Element) {
        el.className = classDiff(el.className, ...classNames);
      }
      return el;
    }
  }

  return _.isIterable(els) ? [...els].map(removeClass) : removeClass(els);
}
