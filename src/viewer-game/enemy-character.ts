import * as ex from 'excalibur';
import { Muzzle } from './muzzle';

export class EnemyCharacter extends ex.Actor {
  public muzzles: Muzzle[];

  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Magenta;
    this.muzzles = [];
  }
}
