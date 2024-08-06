import ReactImport from 'react';

import { classNames } from './classNames';
import { createElement } from './createElement';
import { extendStyles } from './extendStyles';
import { useComponent } from './useComponent';

const { createElement: _void, ...ModifiedReact } = ReactImport;

/** Customized React library. */
export const React = {
  ...ModifiedReact,
  createElement,
  classNames,
  extendStyles,
  useComponent,
};

/** Globalizes the customized React library and React's `<Fragment>`. */
Object.assign(global, { React, Fragment: React.Fragment });
