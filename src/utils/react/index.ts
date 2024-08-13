import ReactImport from 'react';

import { addClass } from './addClass';
import { classNames } from './classNames';
import { createElement } from './createElement';
import { extendStyles } from './extendStyles';
import { removeClass } from './removeClass';
import { useComponent } from './useComponent';

const { createElement: _void, ...ModifiedReact } = ReactImport;

/** Customized React library. */
export const React = {
  ...ModifiedReact,
  addClass,
  createElement,
  classNames,
  extendStyles,
  removeClass,
  useComponent,
};

/** Globalizes the customized React library and React's `<Fragment>`. */
Object.assign(global, { React, Fragment: React.Fragment });
