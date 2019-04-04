import * as ex from 'excalibur';
import { IGun } from 'guntree';
import { Muzzle } from './muzzle';

export class EnemyCharacter extends ex.Actor {
  public muzzles: Muzzle[];

  constructor(config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Magenta;
    this.muzzles = [];
  }

  public setGuntree(gun: IGun): void {
    // TODO: Implement
  }
}
