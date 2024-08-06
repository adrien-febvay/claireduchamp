import type { Conf } from '@/be/app/conf';

declare global {
  const conf: Conf['gui'];
}
