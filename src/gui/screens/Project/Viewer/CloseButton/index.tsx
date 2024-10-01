import { Atom_CloseButton } from '@/gui/atoms/CloseButton';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';

import styles from './styles.scss';

export const Screen_Project_Viewer_CloseButton = React.forwardRef<Handle, Props>((props, ref) => {
  const me = React.useComponent(() => ({
    state: {
      show: true,
      style: {} as React.CSSProperties,
    },
    duration: props.duration ?? 0,
    initialDuration: props.initialDuration ?? props.duration ?? 0,
  }));

  React.useImperativeHandle(ref, () => ({ hide, show, toggle }));
  React.useEffect(fadeOut, []);
  const displayTimeoutManager = useTimeoutPromiseManager();

  function fadeIn(): void {
    me.updateState({ style: { display: void 0, opacity: '1' } });
    void displayTimeoutManager.end().start(me.duration)?.then(hide);
  }

  function fadeOut(): void {
    void displayTimeoutManager.end().start(me.initialDuration)?.then(hide);
  }

  function hide(): void {
    if (me.state.show) {
      me.updateState({ show: false, style: { display: void 0, opacity: '0' } });
      void displayTimeoutManager.end().start(750)?.then(undisplay);
    }
  }

  function show(): void {
    if (!me.state.show) {
      me.updateState({ show: true, style: { display: void 0, opacity: '0' } });
      void displayTimeoutManager.end().start(16)?.then(fadeIn);
    }
  }

  function toggle(state = !me.state.show): boolean {
    (state ? show : hide)();
    return state !== false;
  }

  function undisplay(): void {
    me.updateState({ style: { display: 'none', opacity: '0' } });
  }

  const { duration, initialDuration, style = {}, ...buttonAttrs } = props;
  return <Atom_CloseButton classNames={styles.root} style={{ ...style, ...me.state.style }} {...buttonAttrs} />;
});

export const CloseButton = Screen_Project_Viewer_CloseButton;
