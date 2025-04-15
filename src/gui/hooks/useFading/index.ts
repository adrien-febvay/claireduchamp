import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';

export function useFading(delay = 750, visible = false) {
  const [display, setDisplay] = React.useState(visible ? void 0 : 'none');
  const [opacity, setOpacity] = React.useState(visible ? 1 : 0);
  const [toVisible, setToVisible] = React.useState(visible);
  const timer = useTimeoutPromiseManager();

  function _fadeIn() {
    setOpacity(1);
  }

  function _hide() {
    setDisplay('none');
  }

  function toggle(visible = !toVisible) {
    if (visible !== toVisible) {
      setToVisible(visible);
      if (visible) {
        setDisplay(void 0);
        void timer.restart(1)?.then(_fadeIn);
      } else {
        setOpacity(0);
        void timer.restart(delay)?.then(_hide);
      }
    }
  }

  return [{ display, opacity }, toggle, toVisible] as const;
}
