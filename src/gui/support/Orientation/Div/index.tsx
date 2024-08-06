import { useOrientation } from '@/gui/hooks/useOrientation';

export const Support_Orientation_Div: React.FC<Props> = (props) => {
  const orientation = useOrientation();

  const { type, ...divAttrs } = props;
  const show = orientation === type;

  if (!show) {
    divAttrs.style = divAttrs.style || {};
    divAttrs.style.display = 'none';
  }

  return <div {...divAttrs} />;
};

export const OrientationDiv = Support_Orientation_Div;
