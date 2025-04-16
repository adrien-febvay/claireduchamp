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
        void timer.restart(16)?.then(_fadeIn);
        setDisplay(void 0);
      } else {
        void timer.restart(delay)?.then(_hide);
        setOpacity(0);
      }
    }
  }

  return [{ display, opacity }, toggle, toVisible] as const;
}
