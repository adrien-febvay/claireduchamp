import type { InitOptions, Module as I18nModule, Resources, TypeOptions } from 'i18next';
import type { locales } from '@/gui/locales';
import type { _ } from '@/utils/types';
import type { i18n as i18next } from './index';

declare module '.' {
  export type i18n = typeof i18n;

  export namespace i18n {
    export type Options = _.RequireKeys<InitOptions, 'resources'>;
    export type Language = Languages[number];
    export type Languages = TypeOptions['supportedLngs'];
    export type Locales<Type = Resources> = { [Key in Language]: Type };
    export type Module = I18nModule;

    export namespace Module {
      export type Any = Parameters<i18n['use']>[0];
    }
  }

  export type Options = i18n.Options;
  export type Language = i18n.Language;
  export type Languages = i18n.Languages;
  export type Locales<Type = Resources> = i18n.Locales<Type>;

  export namespace Module {
    export type Any = i18n.Module.Any;
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof locales)[keyof typeof locales];
    supportedLngs: (keyof typeof locales)[];
  }

  export interface i18n {
    lang: i18next.Language;
    fallbackLng: i18next.Language;
    resources: i18next.Locales;
    supportedLngs: i18next.Languages;
  }
}
