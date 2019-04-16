import * as ex from 'excalibur';

export class Bullet extends ex.Actor {
  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Violet;

    this.on('exitviewport', () => {
      this.scene.remove(this);
    });
  }
}
