import useStyles from 'isomorphic-style-loader/useStyles';

import ownStyles from './styles.scss';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';

export const Atom_Image: React.FC<Props> = (props) => {
  useStyles(ownStyles);

  const me = React.useComponent(
    () => ({
      emit: null as (() => void) | null,
      img: null as HTMLImageElement | null,
      state: { error: false, loaded: false, loading: true },
    }),
    { props },
  );

  const allStyles = React.useMemo(extendStyles, [props.styles]);
  const fadeInTimer = useTimeoutPromiseManager(750);
  React.useEffect(updateImage, [props.src]);

  const { className, fadeIn, spanAttrs, styles, ...imgProps } = props;
  const { onError, onLoad, ...imgAttrs } = imgProps;

  me.emit?.();
  me.emit = null;

  function emitFadedIn() {
    if (me.props.fadeIn) {
      me.props.onFadedIn?.();
    }
  }

  function extendStyles() {
    return React.extendStyles(ownStyles, me.props.styles);
  }

  function setError(event: Event | string | null) {
    me.updateState({ error: true, loading: false });
    me.emit = () => me.props.onError?.(event);
  }

  function setLoaded(event: Event | null) {
    me.updateState({ loaded: true, loading: false });
    me.emit = () => me.props.onLoad?.(event);
    void fadeInTimer.restart()?.then(emitFadedIn);
  }

  function setListenToImage(state = false) {
    if (me.img) {
      me.img.onload = state ? setLoaded : null;
      me.img.onerror = state ? setError : null;
    }
  }

  function updateImage() {
    setListenToImage(false);
    if (me.props.src && window) {
      me.img = new window.Image();
      me.img.src = me.props.src;
      fadeInTimer.abort();
      me.updateState({ error: false, loaded: false, loading: true });
      if (!me.img.complete) {
        setListenToImage(true);
      } else if (me.img.naturalHeight) {
        setLoaded(null);
      } else {
        setError(null);
      }
    } else {
      me.img = null;
    }
    return setListenToImage;
  }

  return (
    <span
      classNames={[
        allStyles.root,
        me.state.error && allStyles.error,
        fadeIn !== false && allStyles.fadeIn,
        me.state.loaded && allStyles.loaded,
        me.state.loading && allStyles.loading,
        className,
      ]}
      {...spanAttrs}
    >
      <img classNames={allStyles.image} {...imgAttrs} />
    </span>
  );
};

export const Image = Atom_Image;
