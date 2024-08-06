import { _ } from '@/utils/types';

import { getStyle } from '@/gui/utils/dom/getStyle';

/**
 * Get margin sizes of an element.
 * @param el Element to get the margin sizes of.
 * @param edges Edges to get the margin size of, by default all.
 * @returns A object with the margin sizes as floats.
 */
export function getMargin(el: _.Optional<_.Stylable>, edges: readonly _.Edge[] = _.Edge.names): _.Edges | null {
  const style = getStyle(el);
  if (style) {
    const margin = {} as _.Edges;
    for (const key of edges) {
      margin[key] = Number.parseFloat(style.getPropertyValue(`margin-${key}`));
      if (isNaN(margin[key])) {
        return null;
      }
    }
    return margin;
  } else {
    return null;
  }
}

export namespace getMargin {
  /**
   * Get the horizontal margin sizes of an element.
   * @param el Element to get the margin sizes of.
   * @returns A object with the margin sizes as floats.
   */
  export function hrz(el: _.Optional<_.Stylable>): _.Edges.H | null {
    return getMargin(el, _.Edge.H.names);
  }

  export namespace hrz {
    /**
     * Get the horizontal margin size of an element.
     * @param el Element to get the margin size of.
     * @returns The margin size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const margin = hrz(el);
      return margin && margin.left + margin.right;
    }
  }

  /**
   * Get the vertical margin sizes of an element.
   * @param el Element to get the margin sizes of.
   * @returns A object with the margin sizes as floats.
   */
  export function vrt(el: _.Optional<_.Stylable>): _.Edges.V | null {
    return getMargin(el, _.Edge.V.names);
  }

  export namespace vrt {
    /**
     * Get the vertical margin size of an element.
     * @param el Element to get the margin size of.
     * @returns The margin size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const margin = vrt(el);
      return margin && margin.top + margin.bottom;
    }
  }
}
