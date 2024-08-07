import { Request, Response, NextFunction } from 'express';

function wildcharToRegExpChunk(match: string) {
  const [chunk = '', , greedy = false] = match.split('*');
  const wildcharReplacement = greedy === false ? '[^/]*' : '.*';
  return chunk.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&') + wildcharReplacement;
}

export const PermanentRedirectRouter = (path: PermanentRedirect.Url, target: PermanentRedirect.Target) => {
  const paths = (path instanceof Array ? path : [path]).map((path) => {
    if (path instanceof RegExp) {
      return path;
    } else {
      return new RegExp(`^${path.replace(/[^*]*\*\*?/g, wildcharToRegExpChunk)}$`);
    }
  });

  return ({ url }: Request, res: Response, next: NextFunction) => {
    for (const path of paths) {
      const match = path.exec(url);
      if (match) {
        res.redirect(301, url.replace(path, target as string));
      }
    }
    next();
  };
};

export namespace PermanentRedirect {
  export type Url = string | RegExp | [string | RegExp];

  export type Target = string | Target.Replacer;

  export namespace Target {
    export type Replacer = (substring: string, ...args: any[]) => string;
  }
}
