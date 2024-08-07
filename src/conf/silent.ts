import { loadSafeConf } from './load';

export type { Conf } from './load';

export const conf = loadSafeConf(true);
