import type { Server } from 'http';

import { _ } from '@/utils/types';

export function ServerWithPort(server: Server) {
  return Object.assign(server, { port: _.object(server.address())?.port });
}
