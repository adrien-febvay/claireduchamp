import 'react';

declare module 'react' {
  /** Narrows focus events' type. */
  interface FocusEvent {
    /** Event type. */
    type: 'focus' | 'blur';
  }

  /** Narrows mouse events' type. */
  interface MouseEvent {
    /** Event type. */
    type:
      | 'click'
      | 'contextmenu'
      | 'dblclick'
      | 'mousedown'
      | 'mouseenter'
      | 'mouseleave'
      | 'mousemove'
      | 'mouseout'
      | 'mouseover'
      | 'mouseup';
  }
}
