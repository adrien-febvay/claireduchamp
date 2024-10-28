import { applyParamsToUrl } from '@/gui/utils/url/applyParams';
import { useTranslation } from '@/utils/i18n';

function resolveRawUrl(target: Target) {
  const [, i18n] = useTranslation();
  if (typeof target === 'string') {
    return [target] as const;
  } else {
    const route = target.route ?? target;
    const meta = route.mul ?? (route[i18n.lang]?.pathname ? route[i18n.lang] : route['fr']);
    return [meta?.pathname, meta?.noFollow] as const;
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
  const [url, noFollow] = resolveRawUrl(target);
  return [url && applyParamsToUrl(url, params), noFollow] as const;
}
