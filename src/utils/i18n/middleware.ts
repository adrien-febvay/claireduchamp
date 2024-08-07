import type { Request, Response, NextFunction } from 'express';

import { LanguageDetector, handle } from 'i18next-http-middleware';
import { locales } from '@/gui/locales';
import { i18n, i18nInit } from './index';

const detection = {
  lookupCookie: 'lang',
  lookupHeader: 'accept-language',
  caches: ['cookie'],
  excludeCacheFor: ['cimode'],
  order: ['cookie', 'header'],
};

const i18nHandle = handle(i18nInit(LanguageDetector, { detection, resources: locales }));

/**
 * Augments i18n with shortcuts.
 * @param i18nInstance i18next instance to augment.
 */
export const i18nMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  i18nHandle(req, res, () => {
    Object.defineProperties(req.i18n, {
      lang: { get: () => req.i18n.language },
      fallbackLng: { get: () => i18n.fallbackLng },
      resources: { get: () => i18n.resources },
      supportedLngs: { get: () => i18n.supportedLngs },
    });
    next();
  });
};
