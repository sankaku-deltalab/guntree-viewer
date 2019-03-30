import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';
import { ISettings } from '../settings-interface';

export class GameManager {
  private game: ex.Engine;
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
      const fieldUnit = Math.min(
        canvas.height,
        canvas.width,
      );
      const offset = {
        x: (canvas.width - fieldUnit) / 2,
        y: (canvas.height - fieldUnit) / 2,
      };
      this.fieldTrans = mat.transform(
        mat.translate(offset.x, offset.y),
        mat.scale(fieldUnit),
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

  public updateSetting(settings: ISettings): void {
    // Update enemy
    const loc = mat.applyToPoint(this.fieldTrans, settings.enemy.position);
    this.enemy.x = loc.x;
    this.enemy.y = loc.y;
    this.enemy.rotation = settings.enemy.rotationDeg / 180 * Math.PI;

    // Update muzzle
    // TODO:
  }

  // public updateGunTreeCode(code: string): void {}

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
