import { applyParamsToUrl } from '@/gui/utils/url/applyParams';
import { useTranslation } from '@/utils/i18n';

function resolveRawUrl(target: Target): LinkAttrs {
  const [, i18n] = useTranslation();
  if (typeof target === 'string') {
    return { url: target };
  } else {
    const route = target.route ?? target;
    const meta = route.mul ?? route[i18n.lang];
    return { url: meta.pathname, noFollow: meta.noFollow };
  }
}

export function useResolveUrl<Target extends useResolveUrl.Target>(
  target: Target,
  params: Params.Mandatory<Target>,
): LinkAttrs;

export function useResolveUrl<Target extends useResolveUrl.Target>(
  target: Target,
  params?: Params.Optional<Target>,
): LinkAttrs;

export function useResolveUrl(target: Target, params?: Params.Any): LinkAttrs {
  const { url, noFollow } = resolveRawUrl(target);
  return { url: applyParamsToUrl(url, params), noFollow };
}
