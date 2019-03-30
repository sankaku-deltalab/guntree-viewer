import * as ex from 'excalibur';
import * as mat from 'transformation-matrix';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';

export class GameManager {
  private game: ex.Engine;
  private fieldTrans: mat.Matrix;

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
      const loc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.5 });
      const size = mat.applyToPoint(this.fieldTrans, { x: 1, y: 1 });
      const field = new ex.Actor({
        width: size.x,
        height: size.y,
        color: ex.Color.Black,
        ...loc,
      });
      this.game.add(field);
      const innerField = new ex.Actor({
        width: size.x * 0.99,
        height: size.y * 0.99,
        color: ex.Color.Gray,
        ...loc,
      });
      this.game.add(innerField);
    }

    // Create player
    {
      const pcLoc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.75 });
      const pcSize = Math.min(
        this.game.halfDrawWidth,
        this.game.halfCanvasHeight,
      ) / 10;
      const pc = new PlayerCharacter({
        rotation: -Math.PI / 2,
        width: pcSize,
        height: pcSize,
        ...pcLoc,
      });
      this.game.add(pc);
    }

    // Create enemy
    {
      const enemyLoc = mat.applyToPoint(this.fieldTrans, { x: 0.5, y: 0.25 });
      const enemySize = Math.min(
        this.game.halfDrawWidth,
        this.game.halfCanvasHeight,
      ) / 5;
      const enemy = new EnemyCharacter({
        rotation: Math.PI / 2,
        width: enemySize,
        height: enemySize,
        ...enemyLoc,
      });
      this.game.add(enemy);
    }

    this.game.start();
  }

  public updateSetting(setting: {[key: string]: any}): void {
    
  }

  // public updateGunTreeCode(code: string): void {}
}
