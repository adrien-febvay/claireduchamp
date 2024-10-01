interface Props {
  children: string;
}

export function stringComponent(name: string, tag = name.toLocaleLowerCase()) {
  const Component = ({ children }: Props) => React.createElement(tag, void 0, children);
  Component.displayName = name;
  return Component;
}
