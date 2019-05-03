import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { FireData, Bullet as GTBullet, decomposeTransform, Muzzle as GTMuzzle } from 'guntree';
import { Bullet } from './bullet';
import { PlayerCharacter } from './player-character';
import { Field } from './field';

export class Muzzle extends ex.Actor implements GTMuzzle {
  private bulletPool: Bullet[];

  constructor(
    public readonly name: string,
    private readonly field: Field,
    private readonly target: PlayerCharacter,
    config?: ex.IActorArgs,
  ) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Rose;
    this.bulletPool = [];
  }

  public fire(data: FireData, bullet: GTBullet) {
    const [locInField, angleDeg, scale] = decomposeTransform(data.transform);
    const location = this.field.fieldToCanvasPoint(locInField);
    const speed = data.parameters.get('speed');
    const size = data.parameters.get('size');

    if (speed === undefined) { throw new Error(); }
    if (size === undefined) { throw new Error(); }

    const gameBullet = this.popBullet(location.x, location.y, angleDeg / 180 * Math.PI);

    const velocityInField = mat.applyToPoint(
      mat.rotateDEG(angleDeg),
      { x: speed, y: 0 },
    );
    const velocityInCanvas = this.field.fieldToCanvasVector(velocityInField);
    gameBullet.vel = new ex.Vector(velocityInCanvas.x, velocityInCanvas.y);
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

  public pushBullet(bullet: Bullet): void {
    this.bulletPool.push(bullet);
  }

  private popBullet(x: number, y: number, rotation: number): Bullet {
    const oldBullet = this.bulletPool.pop();
    if (oldBullet !== undefined) {
      oldBullet.x = x;
      oldBullet.y = y;
      oldBullet.rotation = rotation;
      oldBullet.unkill();
      this.scene.add(oldBullet);
      return oldBullet;
    }
    return this.createNewBullet(x, y, rotation);
  }

  private createNewBullet(x: number, y: number, rotation: number): Bullet {
    const bullet = new Bullet(this, {
      x,
      y,
      rotation,
      width: this.getWidth() / 2,
      height: this.getWidth() * 0.7,
    });

    this.scene.add(bullet);
    return bullet;
  }
}
