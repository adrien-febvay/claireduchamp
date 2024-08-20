import { useOrientation } from '@/gui/hooks/useOrientation';

export const Support_Orientation: React.FC<Props> = ({ children, ...types }) =>
  types[useOrientation()] ? <>{children}</> : null;

export const Orientation = Support_Orientation;
