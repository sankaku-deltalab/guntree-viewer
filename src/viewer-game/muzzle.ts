import * as ex from 'excalibur';

export class Muzzle extends ex.Actor {
  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Rose;
  }
}
