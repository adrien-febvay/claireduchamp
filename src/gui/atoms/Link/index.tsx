import { Link as LegacyLink } from 'react-router-dom';
import { useResolveUrl } from '@/gui/hooks/useResolveUrl';
import { useLayout } from '@/gui/hooks/useLayout';
import { isExternalUrl } from '@/utils/misc/isExternalUrl';

export { screens } from '@/gui/screens';

export function Atom_Link<To extends Link.Props.To>(props: Link.Props<To>): React.Node;

export function Atom_Link(props: Link.Props): React.Node {
  const { onClick, params, to, ...linkProps } = props;
  const [url, noFollow] = useResolveUrl(to, params);
  const { scroll } = useLayout();
  const urlRef = React.useRef(url);
  urlRef.current = url;

  function maybeResetScroll(...args: OnClickParameters): void {
    if (!args[0].isDefaultPrevented()) {
      onClick?.(...args);
      if (!args[0].isDefaultPrevented() && urlRef.current === location?.pathname) {
        args[0].preventDefault();
        scroll.reset();
      }
    }
  }

  if (typeof to === 'string' && isExternalUrl(to)) {
    const { preventScrollReset, relative, reloadDocument, ...moreLinkProps } = linkProps;
    const { replace, state, ...anchorAttrs } = moreLinkProps;
    return <a href={url} {...anchorAttrs} />;
  } else {
    if (noFollow && !linkProps.rel) {
      linkProps.rel = 'nofollow';
    }
    const clickHandler = props.preventScrollReset ? void 0 : maybeResetScroll;
    return <LegacyLink to={url ?? ''} onClick={clickHandler} {...linkProps} />;
  }
}

export const Link = Atom_Link;
