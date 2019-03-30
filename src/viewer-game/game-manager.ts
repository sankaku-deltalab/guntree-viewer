import * as ex from 'excalibur';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';

export class GameManager {
  private game: ex.Engine;

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

    // Create player
    {
      const pc = new PlayerCharacter();
      pc.x = this.game.halfDrawWidth;
      pc.y = this.game.halfDrawHeight * 1.5;
      const pcSize = Math.min(
        this.game.halfDrawWidth / 10,
        this.game.halfCanvasHeight / 10,
      );
      pc.setWidth(pcSize);
      pc.setHeight(pcSize);
      this.game.add(pc);
    }

    // Create enemy
    {
      const enemy = new EnemyCharacter();
      enemy.x = this.game.halfDrawWidth;
      enemy.y = this.game.halfDrawHeight * 0.5;
      const enemySize = Math.min(
        this.game.halfDrawWidth / 8,
        this.game.halfCanvasHeight / 8,
      );
      enemy.setWidth(enemySize);
      enemy.setHeight(enemySize);
      this.game.add(enemy);
    }

    this.game.start();
  }

  // public updateSetting(setting: {[key: string]: any}): void {}

  // public updateGunTreeCode(code: string): void {}
}
