import type { Article } from '@/gui/screens/Article';

declare module '.' {
  namespace Link {
    type Data = Article.Data;

    type Id = Article.Id;

    interface Props extends React.DivAttributes {
      articleId?: Id;
    }
  }

  interface Props extends Link.Props {}
}
