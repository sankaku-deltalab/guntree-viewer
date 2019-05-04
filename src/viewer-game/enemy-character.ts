import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { Gun, Player, Muzzle as GTMuzzle, createDefaultPlayer } from 'guntree';
import { Muzzle } from './muzzle';
import { IMuzzleSetting } from '../settings-interface';
import { PlayerCharacter } from './player-character';
import { Field } from './field';

export class EnemyCharacter extends ex.Actor {
  public muzzles: Muzzle[];
  private player: Player | null;
  private stockedSeconds: number;
  private frameSeconds: number;

  constructor(private readonly field: Field, private readonly target: PlayerCharacter, config?: ex.IActorArgs) {
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
        this.stockedSeconds += event.delta / (10 ** 3);
        while (this.stockedSeconds >= this.frameSeconds) {
          this.stockedSeconds -= this.frameSeconds;
          this.player.tick();
        }
      }
    });
  }

  public updateMuzzles(muzzleSettings: IMuzzleSetting[], game: ex.Engine, field: Field): void {
    this.muzzles.map((mzl) => game.remove(mzl));
    this.muzzles = muzzleSettings.map((muzzleSetting) => {
      const muzzle = this.createMuzzle(muzzleSetting, field);
      game.add(muzzle);
      return muzzle;
    });
  }

  public setGuntree(gun: Gun): void {
    const muzzle: { [key: string]: GTMuzzle } = {};
    this.muzzles.map((mzl) => muzzle[mzl.name] = mzl);
    this.player = createDefaultPlayer(muzzle);
    this.player.setGunTree(gun);
  }

  public startFiring(): void {
    if (this.player === null) { return; }
    this.stockedSeconds = 0;
    this.player.start();
  }

  private createMuzzle(muzzleSetting: IMuzzleSetting, field: Field): Muzzle {
    const selfLocInField = field.canvasToFieldPoint(this);
    const selfTransInField = mat.transform(
      mat.translate(selfLocInField.x, selfLocInField.y),
      mat.rotate(this.rotation),
    );

    const locInField = mat.applyToPoint(selfTransInField, muzzleSetting.position);
    const loc = field.fieldToCanvasPoint(locInField);
    const size = Math.min(
      field.scale / 2,
      field.scale / 2,
    ) / 12;
    const rotation = this.rotation;
    const muzzle = new Muzzle(muzzleSetting.name, this.field, this.target, {
      rotation,
      width: size,
      height: size,
      ...loc,
    });
    return muzzle;
  }
}
