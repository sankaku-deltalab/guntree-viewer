import * as ex from 'excalibur';

export class PlayerCharacter extends ex.Actor {
  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Chartreuse;
  }
}
