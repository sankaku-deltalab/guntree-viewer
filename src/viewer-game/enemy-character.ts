import * as ex from 'excalibur';

export class EnemyCharacter extends ex.Actor {
  constructor() {
    super();
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Magenta;
  }
}
