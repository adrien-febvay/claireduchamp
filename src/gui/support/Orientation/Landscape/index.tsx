import { Orientation } from '..';
import { LandscapeDiv } from './Div';

export * from './Div';

export const Support_Orientation_Landscape: React.FC<Props> = (props) => <Orientation type="landscape" {...props} />;

export const Landscape = Object.assign(Support_Orientation_Landscape, { Div: LandscapeDiv });
