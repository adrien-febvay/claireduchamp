import type { Conf } from '@/conf';

declare global {
  const conf: Conf['gui'];
}
