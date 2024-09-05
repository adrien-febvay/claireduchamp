import { i18n, useTranslation } from '@/utils/i18n';

import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '@/gui/support/Router/Context';
import { applyParamsToUrl } from '@/gui/utils/url/applyParams';

export function useChangeLanguage(language?: i18n.Language): [typeof changeLanguage, i18n] {
  const { locales } = React.useContext(Context);
  const [, i18n] = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  function changeLanguage(innerLanguage = language ?? i18n.fallbackLng): void {
    if (innerLanguage !== i18n.language) {
      const meta = locales[innerLanguage];
      const pathname = meta && applyParamsToUrl(meta.pathname, params);
      if (pathname && pathname !== location?.pathname) {
        navigate(pathname);
      } else {
        void i18n.changeLanguage(innerLanguage);
      }
    }
  }
  return [changeLanguage, i18n];
}
