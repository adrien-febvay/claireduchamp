import { OrientationDiv } from '../../Div';

export const Support_Orientation_Portrait_Div: React.FC<Props> = (props) => (
  <OrientationDiv type="landscape" {...props} />
);

export const PortraitDiv = Support_Orientation_Portrait_Div;
