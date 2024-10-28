import type { Screen } from '.';

import { locales } from '@/gui/locales';
import { z } from 'zod';

const metaSchema = z.object({
  pathname: z.string(),
  params: z.record(z.string().optional()).optional(),
  description: z.string().optional(),
  goto: z.string().optional(),
  keywords: z.string().optional(),
  noFollow: z.boolean().optional(),
  title: z.string().optional(),
});

const mulRouteSchema = z.object({
  mul: metaSchema,
  en: z.undefined().optional(),
  fr: z.undefined().optional(),
});

const localizedRouteSchema = z.object({
  mul: z.undefined().optional(),
  en: metaSchema.optional(),
  fr: metaSchema,
});

const routeSchema = z.union([mulRouteSchema, localizedRouteSchema]);

export namespace route {
  export function fromLocales(namespace: Screen.Meta.Namespace, meta?: Partial<Screen.Meta>): Screen.Route {
    const en = metaSchema.safeParse({ ...locales.en[namespace], ...meta }).data;
    const fr = metaSchema.parse({ ...locales.fr[namespace], ...meta });
    return { en, fr };
  }

  export function isMeta<Value>(value: Value): value is Value & Screen.Meta {
    return metaSchema.safeParse(value).success;
  }

  export function test<Value>(value: Value): value is Value & Screen.Route {
    return routeSchema.safeParse(value).success;
  }
}
