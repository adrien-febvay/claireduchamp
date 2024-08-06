import { useOrientation } from '@/gui/hooks/useOrientation';
import { Landscape } from './Landscape';
import { Portrait } from './Portrait';

export * from './Div';
export * from './Landscape';
export * from './Portrait';

export const Support_Orientation: React.FC<Props> = ({ children, override, type }) =>
  useOrientation(override) === type ? <>{children}</> : null;

export const Orientation = Object.assign(Support_Orientation, { Landscape, Portrait });
