export const Atom_Phone: React.FC<Props> = ({ children, number, ...props }) => (
  <a href={`phone:${number.replace(/\s+/g, '')}`} {...props}>
    {children || number}
  </a>
);

export const Phone = Atom_Phone;
