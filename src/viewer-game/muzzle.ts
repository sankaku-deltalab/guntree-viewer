import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { IFireData, IBullet, decomposeTransform, IMuzzle } from 'guntree';
import { Bullet } from './bullet';
import { PlayerCharacter } from './player-character';
import { Field } from './field';

export class Muzzle extends ex.Actor implements IMuzzle {
  constructor(
    public readonly name: string,
    private readonly field: Field,
    private readonly target: PlayerCharacter,
    config?: ex.IActorArgs,
  ) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Rose;
  }

  public fire(data: IFireData, bullet: IBullet) {
    const [locInField, angleDeg, scale] = decomposeTransform(data.transform);
    const location = this.field.fieldToCanvasPoint(locInField);
    const speed = data.parameters.get('speed');
    const size = data.parameters.get('size');

    if (speed === undefined) { throw new Error(); }
    if (size === undefined) { throw new Error(); }

    const gameBullet = new Bullet({
      x: location.x,
      y: location.y,
      width: this.getWidth() / 2,
      height: this.getWidth() * 0.7,
      rotation: angleDeg / 180 * Math.PI,
    });

    const velocityInField = mat.applyToPoint(
      mat.rotateDEG(angleDeg),
      { x: speed, y: 0 },
    );
    const velocityInCanvas = this.field.fieldToCanvasVector(velocityInField);
    gameBullet.vel = new ex.Vector(velocityInCanvas.x, velocityInCanvas.y);

    this.scene.add(gameBullet);
  }

  public getMuzzleTransform() {
    const loc = this.field.canvasToFieldPoint(this);
    return mat.transform(
      mat.translate(loc.x, loc.y),
      mat.rotate(this.rotation),
    );
  }

  public getEnemyTransform() {
    const loc = this.field.canvasToFieldPoint(this.target);
    return mat.transform(
      mat.translate(loc.x, loc.y),
      mat.rotate(this.target.rotation),
    );
  }
}
