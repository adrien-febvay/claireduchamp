import Cookies from 'cookie-parser';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { RedirectToHttpsMiddleware } from './RedirectToHttps';

export const Middlewares = {
  Cookies: Cookies,
  RedirectToHttps: RedirectToHttpsMiddleware,
  i18n: i18nMiddleware,
};
