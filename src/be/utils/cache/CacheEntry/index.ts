import type { CacheManager } from '../CacheManager';

export class CacheEntry {
  public readonly manager: CacheManager;
  public readonly key: string;

  public constructor(manager: CacheManager, ...key: string[]) {
    this.manager = manager;
    this.key = key
      .map((chunk) => chunk.replace(/^\/|\/$/g, ''))
      .join('/')
      .replace(/\?.*/, '');
  }

  public get exists() {
    return this.manager.has(this.key);
  }

  public get() {
    return this.manager.get(this.key);
  }

  public remove() {
    return this.manager.remove(this.key);
  }

  public set(data: CacheManager.Data) {
    return this.manager.set(this.key, data);
  }
}
