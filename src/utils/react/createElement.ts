/* eslint @typescript-eslint/no-duplicate-type-constituents: 0 */
/* eslint @typescript-eslint/no-redundant-type-constituents: 0 */

// Customized `createElement()` function handling the `[classNames]` attribute.
import React, {
  Attributes,
  CElement,
  ClassAttributes,
  ClassType,
  ClassicComponent,
  ClassicComponentClass,
  Component,
  ComponentClass,
  ComponentState,
  DetailedReactHTMLElement,
  DOMAttributes,
  DOMElement,
  FunctionComponent,
  FunctionComponentElement,
  HTMLAttributes,
  InputHTMLAttributes,
  SVGAttributes,
} from 'react';

import { isExternalUrl } from '@/utils/misc/isExternalUrl';
import { classNames } from './classNames';

type InputProps<Elem> = InputHTMLAttributes<Elem> & ClassAttributes<Elem>;

type ClassicType<P extends object> = ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>;

// 1
export function createElement(
  type: 'input',
  props?: InputProps<HTMLInputElement> | null,
  ...children: React.Node[]
): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// 2
export function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
  type: keyof React.HTML,
  props?: (ClassAttributes<T> & P) | null,
  ...children: React.Node[]
): DetailedReactHTMLElement<P, T>;

// 3
export function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
  type: keyof React.SVG,
  props?: (ClassAttributes<T> & P) | null,
  ...children: React.Node[]
): React.SVGElement;

// 4
export function createElement<P extends DOMAttributes<T>, T extends React.Element>(
  type: string,
  props?: (ClassAttributes<T> & P) | null,
  ...children: React.Node[]
): DOMElement<P, T>;

// 5
export function createElement<P extends object>(
  type: FunctionComponent<P>,
  props?: (Attributes & P) | null,
  ...children: React.Node[]
): FunctionComponentElement<P>;

// 6
export function createElement<P extends object>(
  type: ClassicType<P>,
  props?: (ClassAttributes<ClassicComponent<P, ComponentState>> & P) | null,
  ...children: React.Node[]
): CElement<P, ClassicComponent<P, ComponentState>>;

// 7
export function createElement<P extends object, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
  type: ClassType<P, T, C>,
  props?: (ClassAttributes<T> & P) | null,
  ...children: React.Node[]
): CElement<P, T>;

// 8
export function createElement<P extends object>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  ...children: React.Node[]
): JSX.Element<P>;

export function createElement(
  type: Type,
  props?: React.HTMLAttributes<unknown> | null,
  ...children: React.Node[]
): React.Node {
  if (props) {
    const { classNames: classes, ...newProps } = props;
    if (classes) {
      newProps.className = classNames(newProps.className, classes);
    }
    if (type === 'a') {
      const anchorAttrs = newProps as React.AnchorAttributes;
      if (anchorAttrs.target === void 0 && isExternalUrl(anchorAttrs.href)) {
        anchorAttrs.target = '_blank';
      }
    } else if (type === 'button') {
      const buttonAttrs = newProps as React.ButtonAttributes;
      if (buttonAttrs.type === void 0) {
        buttonAttrs.type = 'button';
      }
    }
    return React.createElement(type, newProps, ...children);
  } else {
    return React.createElement(type, props, ...children);
  }
}

type Type =
  | 'input'
  | keyof React.HTML
  | keyof React.SVG
  | string
  | FunctionComponent
  | ClassicType<object>
  | ClassType<object, Component, ComponentClass>
  | FunctionComponent
  | ComponentClass;
