import Cookies from 'cookie-parser';
import { i18nMiddleware } from '@/utils/i18n/middleware';
import { RedirectionMiddleware } from './Redirection';

export const Middlewares = {
  Cookies: Cookies,
  Redirection: RedirectionMiddleware,
  i18n: i18nMiddleware,
};
