import { i18n } from '.';

/**
 * Initializes i18n with a language detector and options.
 * @param detector Language detector to use.
 * @param options i18next options.
 */
export const i18nInit = (detector: i18n.Module.Any, options: i18n.Options) => {
  const supportedLngs = Object.keys(options.resources);

  void i18n.use(detector).init({
    cleanCode: true,
    detection: {
      lookupCookie: 'lang',
      caches: ['cookie'],
      excludeCacheFor: ['cimode'],
      order: ['cookie', 'navigator'],
    },
    fallbackLng: supportedLngs[0],
    interpolation: { escapeValue: false },
    supportedLngs,
    ...options,
  });

  Object.defineProperties(i18n, {
    lang: { get: () => i18n.language },
    fallbackLng: { value: options.fallbackLng },
    resources: { value: options.resources },
    supportedLngs: { value: supportedLngs },
  });

  return i18n;
};
