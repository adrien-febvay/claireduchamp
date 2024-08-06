import useStyles from 'isomorphic-style-loader/useStyles';
import { BarLoader } from '@/gui/atoms/BarLoader';
import { Logo } from '@/gui/atoms/Logo';
import { onFontLoad } from '@/gui/hooks/onFontLoad';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';

import styles from './styles.scss';
import logoStyles from './logo.scss';

const BODONI = { family: 'Bodoni MT', style: 'italic' } as const;
const CALIBRI = { family: 'Calibri Light' } as const;

export const Molecule_LoadingOverlay: React.FC<Props> = (props) => {
  useStyles(styles, logoStyles);

  const memo = React.useMemo(() => props, [props]);
  const [display, setDisplay] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);
  const [, isBodiniResolved] = onFontLoad(BODONI, 'resolved');
  const [, isCalibriResolved] = onFontLoad(CALIBRI, 'resolved');

  const displayTimeoutManager = useTimeoutPromiseManager({ delay: 350 });

  React.useEffect(updateDisplay, [display, memo.visible]);
  React.useEffect(updateLoaded, [isBodiniResolved && isCalibriResolved]);

  function hide(): void {
    setDisplay(false);
  }

  function updateDisplay(): void {
    if (display && !memo.visible) {
      window.scrollTo({ top: 0 });
      void displayTimeoutManager.restart()?.then(hide);
    }
  }

  function updateLoaded(): void {
    if (!loaded && isBodiniResolved && isCalibriResolved) {
      setLoaded(true);
      memo.onLoad?.();
    }
  }

  const withoutTitle = !isBodiniResolved && logoStyles.withoutTitle;
  const withoutSubtitle = !isCalibriResolved && logoStyles.withoutSubtitle;

  return display ? (
    <div classNames={[styles.root, memo.visible && styles.visible]}>
      <div className={styles.content}>
        <Logo classNames={[styles.logo, withoutTitle, withoutSubtitle]} styles={logoStyles} />
        <div className={styles.loaderContainer}>
          <BarLoader className={styles.loader} />
        </div>
      </div>
    </div>
  ) : null;
};

export const LoadingOverlay = Molecule_LoadingOverlay;
