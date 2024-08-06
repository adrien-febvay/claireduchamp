import type { Screen } from '@/gui/screens';
import type { Project } from '.';

type TransformMeta<Route extends Project.Data, Id extends Project.Id> = Omit<Route[Id], 'pathname'> & {
  pathname: `${Route[Id]['pathname']}/:photo?`;
  params: { id: Id };
};

declare module './routes' {
  type Meta = Screen.Meta;

  type Route = Screen.Route;

  type Routes = {
    [Id in Project.Id]: {
      en: TransformMeta<Project.Data.En, Id>;
      fr: TransformMeta<Project.Data.Fr, Id>;
    };
  };
}
