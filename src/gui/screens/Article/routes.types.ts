import type { Screen } from '@/gui/screens';
import type { Article } from '../Article';

declare module './routes' {
  type Meta = Screen.Meta;

  type Route = Screen.Route;

  type Routes = {
    [Id in Article.Id]: {
      fr: Article.Data;
    };
  };
}
