import parse from 'html-react-parser';

export const Atom_Text: React.FC<Props> = ({ content, html, ...pAttrs }) =>
  content.split('\n').map((paragraph, index) => (
    <p key={index} {...pAttrs}>
      {html ? parse(paragraph) : paragraph}
    </p>
  ));

export const Text = Atom_Text;
