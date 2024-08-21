import { EventEmitter } from 'events';

export class Scroll extends EventEmitter<EventMap> {
  public reset() {
    this.emit('reset');
  }

  public to(target: Target, behavior: ScrollBehavior = 'smooth') {
    this.emit('to', target, behavior);
  }
}
