import Cookies from 'cookie-parser';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { RestrictLocalMiddleware } from './RestrictLocal';

export const Middlewares = {
  Cookies: Cookies,
  RestrictLocal: RestrictLocalMiddleware,
  i18n: i18nMiddleware,
};
