/* eslint @typescript-eslint/no-explicit-any: 0 */
import type { JSXElementConstructor as NewElement, ReactElement } from 'react';

import type { _ } from '@/utils/types';

declare global {
  namespace JSX {
    /**
     * JSX element.
     * @param P Element properties.
     * @param T Element type.
     */
    interface Element<P = unknown, T extends string | NewElement<unknown> = string | NewElement<unknown>>
      extends ReactElement<P, T> {}

    namespace Element {
      /** Any JSX element. */
      type Any = Element<any, any>;
    }
  }
}

// Note: cannot create shortcut for React.Element, as it messes with React type declarations.
declare module 'react' {
  /** React component children (shortcut). */
  type Children = typeof React.Children;

  namespace Children {
    /** React children property (shortcut). */
    type Prop = PropsWithChildren<object>;
  }

  namespace Component {
    /** Any component class instance. */
    type Any = Component<any, any>;

    /** Infers properties of a component class instance. */
    type InferProps<ComponentType extends Component.Any> =
      ComponentType extends React.Component<infer Props> ? Props : never;
  }

  namespace ComponentClass {
    /** Any component class. */
    type Any = ComponentClass<any>;

    /** Infers properties of a component class. */
    type InferProps<ComponentType extends ComponentClass.Any> =
      ComponentType extends React.ComponentClass<infer Props> ? Props : never;
  }

  /** Infers component instance. */
  type ComponentInstance<ComponentType extends ComponentType.Any = ComponentType.Any> = _.ResultType<ComponentType>;

  namespace ComponentInstance {
    /** Any component type. */
    type Any = ComponentInstance;
  }

  namespace ComponentType {
    /** Any component type. */
    type Any = ComponentType<any>;

    /** Infers properties of a component type. */
    type InferProps<ComponentType extends ComponentType.Any> =
      ComponentType extends React.ComponentType<infer Props> ? Props : never;
  }

  /** Component wrapper. */
  type ComponentWrapper<
    Props extends object = object,
    Element extends ComponentInstance.Any = ComponentInstance.Any,
  > = FunctionComponent<Props> & ((props: Props, context?: any) => Element);

  /** React element (shortcut). */
  type Element<Props = any, ComponentType extends string | NewElement<any> = string | NewElement<any>> = ReactElement<
    Props,
    ComponentType
  >;

  namespace FC {
    /** Any function component. */
    type Any = FunctionComponent<any>;

    /** Infers properties of a function component. */
    type InferProps<ComponentType extends FunctionComponent.Any> =
      ComponentType extends React.FC<infer Props> ? Props : never;
  }

  namespace FunctionComponent {
    /** Any function component. */
    type Any = FunctionComponent<any>;

    /** Infers properties of a function component. */
    type InferProps<ComponentType extends FunctionComponent.Any> =
      ComponentType extends React.FC<infer Props> ? Props : never;
  }

  /** React HTML (shortcut). */
  type HTML = ReactHTML;

  /** Infers properties of component type. */
  type InferProps<ComponentType> =
    ComponentType extends JSXElementConstructor<infer Props>
      ? ComponentType extends ComponentClass<Props>
        ? ClassAttributes<InstanceType<ComponentType>> & Props
        : Props
      : never;

  /** React node (shortcut). */
  type Node = ReactNode;

  namespace Ref {
    /**
     * Component reference.
     *
     * The difference with `RefObject<>` is the typing: you may provide the component type instead of the component instance.
     */
    type Object<Target extends Ref.Target = Ref.Target> = RefObject<
      _.ResultType<Target> | Exclude<Target, _.Function.Any>
    >;

    /** Any component reference target: an HTML element, a componnent instance or type. */
    type Target = HTMLElement | typeof HTMLElement | ComponentInstance.Any | ComponentType.Any;
  }

  /** React SVG (shortcut).*/
  type SVG = ReactSVG;

  /** React SVG element (shortcut). */
  type SVGElement = ReactSVGElement;

  /**
   * Creates a new component reference object typed after the provided component.
   * @param target Component type/instance used for typing the component reference.
   * @returns A component reference object.
   */
  function createRef<Target extends Ref.Target>(target: Target | null): Ref.Object<Target>;
}
