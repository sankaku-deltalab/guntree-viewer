import * as ex from 'excalibur';
import { Muzzle } from './muzzle';

export class Bullet extends ex.Actor {
  constructor(private muzzle: Muzzle, config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Violet;

    this.on('exitviewport', () => {
      this.kill();
      this.muzzle.pushBullet(this);
    });
  }
}
