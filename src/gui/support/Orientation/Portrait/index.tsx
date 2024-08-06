import { Orientation } from '..';
import { PortraitDiv } from './Div';

export * from './Div';

export const Support_Orientation_Portrait: React.FC<Props> = (props) => <Orientation type="portrait" {...props} />;

export const Portrait = Object.assign(Support_Orientation_Portrait, { Div: PortraitDiv });
