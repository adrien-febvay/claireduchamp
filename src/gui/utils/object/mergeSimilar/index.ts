import { _ } from '@/utils/types';

export function mergeSimilarObjects<Type extends object>(
  target: _.Nullish<Partial<Type>>,
  source: _.Nullish<Type>,
): Type | null;

export function mergeSimilarObjects(target: unknown, source: unknown): object | null {
  if (!_.isObject(source)) {
    return _.object(target);
  } else if (!_.isObject(target)) {
    return source;
  } else {
    const merged: _.Object = { ...target };
    for (const key in source) {
      if (source[key] !== void 0) {
        merged[key] = source[key];
      }
    }
    return merged;
  }
}
