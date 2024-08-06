export const Atom_Mail: React.FC<Props> = ({ address, children, ...props }) => (
  <a href={`mailto:${address}`} {...props}>
    {children || address}
  </a>
);

export const Mail = Atom_Mail;
