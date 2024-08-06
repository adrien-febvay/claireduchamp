import { greatest } from '@/gui/utils/number/greatest';

const FRICTION = 1e-2;
const THRESHOLD = 20;

const { abs, max, sign } = Math;

/**
 * Updates a speed in a smooth way.
 * @param speed Current speed.
 * @param newSpeed New speed.
 * @param friction Friction applied to current speed.
 * @returns New speed if greater than current, otherwise current one
 * diminished by friction plus new speed if speeds do not have the same direction.
 */
function updateSpeed(speed: number, newSpeed: number, friction: number): number {
  if (sign(newSpeed) !== sign(speed)) {
    // If speeds have different diffections, return their sum.
    return speed * max(1 - friction, 0) + newSpeed;
  } else {
    // Otherwise return the greatest.
    return greatest(speed * max(1 - friction, 0), newSpeed);
  }
}

const initData: Data = {
  axis: null,
  deltaX: 0,
  deltaY: 0,
  deltaT: 0,
  pageX: 0,
  pageY: 0,
  speedX: 0,
  speedY: 0,
  startX: 0,
  startY: 0,
  startT: 0,
};

export class DataHandler {
  public data = null as Data | null;
  public active = true;

  public end(): Data | null {
    const data = this.data;
    this.data = null;
    return data && { ...data };
  }

  public restart({ pageX = 0, pageY = 0 }: Partial<Touch> = {}): Data | null {
    const startT = Number(new Date());
    if (this.active) {
      this.data = { ...initData, pageX, pageY, startX: pageX, startY: pageY, startT };
    }
    return this.data && { ...this.data };
  }

  public toggle(active = !this.active): boolean {
    this.data = null;
    return (this.active = active);
  }

  public update({ pageX = 0, pageY = 0 }: Partial<Touch> = {}): Data | null {
    const { data } = this;
    if (data) {
      const deltaX = pageX - data.startX;
      const deltaY = pageY - data.startY;
      const deltaT = Number(new Date()) - data.startT;
      const friction = FRICTION * deltaT;
      if (!data.axis) {
        data.axis = abs(deltaX) >= THRESHOLD ? 'x' : abs(deltaY) >= THRESHOLD ? 'y' : null;
      }
      data.deltaX = deltaX;
      data.deltaY = deltaY;
      data.deltaT = deltaT;
      data.pageX = pageX;
      data.pageY = pageY;
      data.speedX = updateSpeed(data.speedX, deltaX / deltaT, friction);
      data.speedY = updateSpeed(data.speedY, deltaY / deltaT, friction);
    }
    return data && { ...data };
  }
}
