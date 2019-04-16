import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { IGun, IPlayer, IMuzzle, Player } from 'guntree';
import { Muzzle } from './muzzle';
import { IMuzzleSetting } from '../settings-interface';
import { Field } from './field';

export class EnemyCharacter extends ex.Actor {
  public muzzles: Muzzle[];
  private player: IPlayer | null;
  private stockedSeconds: number;
  private frameSeconds: number;

  constructor(private readonly field: Field, config?: ex.IActorArgs) {
    super(config);
    this.collisionType = ex.CollisionType.Passive;
    this.color = ex.Color.Magenta;
    this.muzzles = [];
    this.player = null;
    this.stockedSeconds = 0;
    this.frameSeconds = 1 / 60;

    this.on('preupdate', (event) => {
      if (event === undefined) { return; }

      // Update firing
      if (this.player !== null && this.player.isRunning) {
        this.stockedSeconds += event.delta;
        while (this.stockedSeconds >= this.frameSeconds) {
          this.stockedSeconds -= this.frameSeconds;
          this.player.tick();
        }
      }
    });
  }

  public updateMuzzles(muzzleSettings: IMuzzleSetting[], game: ex.Engine, fieldUnit: number): void {
    const enemyTrans = mat.transform(
      mat.translate(this.x, this.y),
      mat.rotate(this.rotation),
      mat.scale(fieldUnit),
    );

    this.muzzles.map((mzl) => game.remove(mzl));

    this.muzzles = muzzleSettings.map((muzzleSetting) => {
      const loc = mat.applyToPoint(enemyTrans, muzzleSetting.position);
      const size = Math.min(
        game.halfDrawWidth,
        game.halfCanvasHeight,
      ) / 12;
      const rotation = this.rotation + (muzzleSetting.rotationDeg / 180 * Math.PI);
      const muzzle = new Muzzle(muzzleSetting.name, {
        rotation,
        width: size,
        height: size,
        ...loc,
      });
      game.add(muzzle);
      return muzzle;
    });
  }

  public setGuntree(gun: IGun): void {
    const muzzle: {[key: string]: IMuzzle} = {};
    this.muzzles.map((mzl) => muzzle[mzl.name] = mzl);
    this.player = new Player({ muzzle });
    this.player.setGunTree(gun);
  }

  public startFiring(): void {
    if (this.player === null) { return; }
    this.stockedSeconds = 0;
    this.player.start();
  }
}
