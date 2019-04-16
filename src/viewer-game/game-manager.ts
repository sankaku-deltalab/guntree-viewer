import * as ex from 'excalibur';
import { Field } from './field';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';
import { ISettings, IEnemySetting } from '../settings-interface';
import { evalGunTree } from './guntree-evaluator';

export class GameManager {
  private game: ex.Engine;
  private fieldUnit: number;
  private field: Field;
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
      this.field = new Field({ x: canvas.width, y: canvas.height });
    }

    // Draw field area
    this.game.add(this.createField());

    // Add player
    this.playerCharacter = this.createPlayerCharacter();
    this.game.add(this.playerCharacter);

    // Add enemy
    this.enemy = this.createEnemyCharacter(this.playerCharacter);
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
    const loc = this.field.fieldToCanvasPoint(setting.position);
    this.enemy.x = loc.x;
    this.enemy.y = loc.y;
    this.enemy.rotation = setting.rotationDeg / 180 * Math.PI;

    this.enemy.updateMuzzles(setting.muzzles, this.game, this.field);
  }

  private createField(): ex.Actor {
    const loc = this.field.fieldToCanvasPoint({ x: 0, y: 0 });
    const size = this.field.scale;
    return new ex.Actor({
      width: size,
      height: size,
      color: ex.Color.White,
      ...loc,
    });
  }

  private createPlayerCharacter(): PlayerCharacter {
    const loc = this.field.fieldToCanvasPoint({ x: -0.25, y: 0 });
    const size = Math.min(
      this.game.halfDrawWidth,
      this.game.halfCanvasHeight,
    ) / 10;
    return new PlayerCharacter({
      rotation: 0,
      width: size,
      height: size,
      ...loc,
    });
  }

  private createEnemyCharacter(target: PlayerCharacter): EnemyCharacter {
    const loc = this.field.fieldToCanvasPoint({ x: 0.25, y: 0 });
    const size = Math.min(
      this.game.halfDrawWidth,
      this.game.halfCanvasHeight,
    ) / 5;
    return new EnemyCharacter(this.field, target, {
      rotation: 0,
      width: size,
      height: size,
      ...loc,
    });
  }
}
