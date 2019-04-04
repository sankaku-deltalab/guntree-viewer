import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { IFireData, IBullet, decomposeTransform, IMuzzle } from 'guntree';

export class Muzzle extends ex.Actor implements IMuzzle {
  constructor(public readonly name: string, config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Rose;
  }

  public fire(data: IFireData, bullet: IBullet) {
      const [location, angleDeg, scale] = decomposeTransform(data.transform);
      const speed = data.parameters.get('speed');
      const size = data.parameters.get('size');
      // TODO: Fire bullet at game
  }

  public getMuzzleTransform() {
      return mat.transform(
          mat.translate(this.x, this.y),
          mat.rotateDEG(this.rotation),
      );
  }

  public getEnemyTransform() {
      // TODO: Set enemy transform
      return mat.transform(
          mat.translate(0, 0),
          mat.rotateDEG(0),
      );
  }
}
