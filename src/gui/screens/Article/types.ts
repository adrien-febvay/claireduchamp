import type { articles } from '@/gui/locales/blog';

declare module '.' {
  namespace Article {
    type Data = articles.Data;

    type Id = articles.Id;
  }

  type Params = { id: Article.Id };
}
