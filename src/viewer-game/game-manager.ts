import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';
import { ISettings, IEnemySetting } from '../settings-interface';
import { evalGunTree } from './guntree-evaluator';

export class GameManager {
  private game: ex.Engine;
  private fieldUnit: number;
  private fieldTrans: mat.Matrix;
  private playerCharacter: PlayerCharacter;
  private enemy: EnemyCharacter;

  constructor(canvas: HTMLCanvasElement) {
    // Create game
    const originalGetter = document.getElementById;
    document.getElementById = () => canvas;
    this.game = new ex.Engine({
      width: canvas.width,
      height: canvas.height,
      canvasElementId: '__anyId',
      pointerScope: ex.Input.PointerScope.Canvas,
      backgroundColor: ex.Color.DarkGray,
      suppressConsoleBootMessage: true,
    });
    document.getElementById = originalGetter;

    // Create game coordinates
    {
      // leftUpper: { x: 0, y: 0 }
      // rightUpper: { x: 1, y: 0 }
      // rightUnder: { x: 1, y: 1 }
      this.fieldUnit = Math.min(
        canvas.height,
        canvas.width,
      );
      const offset = {
        x: (canvas.width - this.fieldUnit) / 2,
        y: (canvas.height - this.fieldUnit) / 2,
      };
      this.fieldTrans = mat.transform(
        mat.translate(offset.x, offset.y),
        mat.scale(this.fieldUnit),
      );
    }

    // Draw field area
    this.game.add(this.createField());

    // Add player
    this.playerCharacter = this.createPlayerCharacter();
    this.game.add(this.playerCharacter);

    // Add enemy
    this.enemy = this.createEnemyCharacter();
    this.game.add(this.enemy);

    this.game.start();
  }

  public updateSettings(settings: ISettings): void {
    this.updateEnemySetting(settings.enemy);
  }

  public updateGunTreeCode(code: string): void {
    const gt = evalGunTree(code);
    this.enemy.setGuntree(gt);
  }

  private updateEnemySetting(setting: IEnemySetting): void {
    // Update enemy
    const loc = mat.applyToPoint(this.fieldTrans, setting.position);
    this.enemy.x = loc.x;
    this.enemy.y = loc.y;
    this.enemy.rotation = setting.rotationDeg / 180 * Math.PI;

    this.enemy.updateMuzzles(setting.muzzles, this.game, this.fieldUnit);
  }

  private createField(): ex.Actor {
    const loc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.5 });
    const size = mat.applyToPoint(this.fieldTrans, { x: 1, y: 1 });
    return new ex.Actor({
      width: size.x,
      height: size.y,
      color: ex.Color.White,
      ...loc,
    });
  }

  private createPlayerCharacter(): PlayerCharacter {
    const loc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.75 });
    const size = Math.min(
      this.game.halfDrawWidth,
      this.game.halfCanvasHeight,
    ) / 10;
    return new PlayerCharacter({
      rotation: -Math.PI / 2,
      width: size,
      height: size,
      ...loc,
    });
  }

  private createEnemyCharacter(): EnemyCharacter {
    const loc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.25 });
    const size = Math.min(
      this.game.halfDrawWidth,
      this.game.halfCanvasHeight,
    ) / 5;
    return new EnemyCharacter({
      rotation: Math.PI / 2,
      width: size,
      height: size,
      ...loc,
    });
  }
}
