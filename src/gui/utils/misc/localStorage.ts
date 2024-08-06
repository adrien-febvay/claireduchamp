import { _ } from '@/utils/types';

export const duration = {
  second: 1e3,
  minute: 6e4,
  hour: 36e5,
  day: 864e5,
  month: 2592e6,
  year: 31536e6,
};

export class LocalStorageItem {
  public readonly key: string;
  public readonly expiration?: Expiration;

  public constructor(key: string, expiration?: Expiration) {
    this.key = key;
    if (expiration !== void 0) {
      this.expiration = expiration;
    }
  }

  public get(): unknown {
    return getItem(this.key);
  }

  public remove(): void {
    removeItem(this.key);
  }

  public set(value: unknown): void {
    setItem(this.key, value, this.expiration);
  }
}

export function getItem(key: string): unknown {
  const json = window.localStorage?.getItem(key);
  const parsed: unknown = json && JSON.parse(json);
  const data = _.object(parsed);
  const expiration = data?.expiration;
  const date = Number(new Date());
  if (expiration === null || (typeof expiration === 'number' && expiration >= date)) {
    return data?.value;
  } else if (json !== null) {
    window.localStorage?.removeItem(key);
  }
  return null;
}

export function removeItem(key: string): void {
  window.localStorage?.removeItem(key);
}

export function setItem(key: string, value: unknown, expiration?: Expiration): void {
  const date = expiration instanceof Date ? expiration : expiration ? Number(new Date()) + expiration : null;
  const json = JSON.stringify({ expiration: date, value });
  window.localStorage?.setItem(key, json);
}

export const localStorage = { Item: LocalStorageItem, duration, getItem, removeItem, setItem };

export namespace localStorage {
  export type Expiration = number | Date;
}

type Expiration = localStorage.Expiration;
