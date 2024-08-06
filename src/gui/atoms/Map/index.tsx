import parse from 'html-react-parser';

export const Atom_Map: React.FC<Props> = (props) => {
  const { Component, children = <p />, content, glue, html, separator = '\n' } = props;
  const child = React.Children.toArray(children)[0];
  const element = React.isValidElement(child) && child;
  const glueElement = React.isValidElement(glue) && glue;
  return content
    .split(separator)
    .map((chunk) => (html ? parse(chunk) : chunk))
    .map((chunk, index) => {
      if (Component) {
        return <Component key={index} children={chunk} />;
      } else {
        return element ? React.cloneElement(element, { key: index }, chunk) : chunk;
      }
    })
    .map((element, index) => [
      index > 0 && (glueElement ? React.cloneElement(glueElement, { key: `glue${index}` }) : glue),
      element,
    ])
    .flat();
};

export const Map = Atom_Map;
