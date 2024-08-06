import detectMobile from 'is-mobile';
import { Head } from '@/gui/support/Head';

export const useMobileDetection = () => React.useContext(Head.Context).isMobile;

export const useMobileDetectionFix = () => {
  const headContext = React.useContext(Head.Context);
  const [isMobile, setIsMobile] = React.useState(headContext.isMobile);

  React.useEffect(mobileDetectionFix, []);

  function mobileDetectionFix() {
    if (isMobile !== detectMobile({ tablet: true })) {
      headContext.isMobile = !isMobile;
      setIsMobile(!isMobile);
    }
  }

  return isMobile;
};
