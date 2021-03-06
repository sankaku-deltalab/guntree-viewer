import * as ex from 'excalibur';
import { Field } from './field';
import { PlayerCharacter } from './player-character';
import { EnemyCharacter } from './enemy-character';
import { ISettings, IEnemySetting } from '../settings-interface';
import { evalGunTree } from './guntree-evaluator';
import { TouchInput } from './touch-input';

export class GameManager {
  private game: ex.Engine;
  private touchInput: TouchInput;
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

    // Create touch input
    this.touchInput = this.createTouchInput(this.game);
    this.game.input.pointers.primary.on('down', (event) => {
      if (!(event instanceof ex.Input.PointerEvent)) { return; }
      this.touchInput.touchAt(event.screenPos);
    });
    this.game.input.pointers.primary.on('up', (event) => {
      if (!(event instanceof ex.Input.PointerEvent)) { return; }
      this.touchInput.unTouchAt(event.screenPos);
    });
    this.game.input.pointers.primary.on('move', (event) => {
      if (!(event instanceof ex.Input.PointerEvent)) { return; }
      this.touchInput.moveTo(event.screenPos);
    });

    // Create game coordinates
    // leftUpper: { x: 0.5, y: -0.5 }
    // rightUpper: { x: 0.5, y: 0.5 }
    // rightUnder: { x: -0.5, y: 0.5 }
    this.field = new Field({ x: this.game.drawWidth, y: this.game.drawHeight });

    // Draw field area
    this.game.add(this.createField());

    // Add player
    this.playerCharacter = this.createPlayerCharacter();
    this.game.add(this.playerCharacter);

    // Add enemy
    this.enemy = this.createEnemyCharacter(this.playerCharacter);
    this.game.add(this.enemy);

    // Press space to play
    this.game.input.keyboard.on('press', (event) => {
      if (event === undefined) { return; }
      if (event.key === ex.Input.Keys.Space) {
        this.enemy.startFiring();
      }
    });

    // Press WASD to move
    this.game.input.keyboard.on('hold', (event) => {
      if (event === undefined) { return; }

      const input = { x: 0, y: 0 };
      if (event.key === ex.Input.Keys.W) {
        input.y -= 1;
      }
      if (event.key === ex.Input.Keys.D) {
        input.x += 1;
      }
      if (event.key === ex.Input.Keys.S) {
        input.y += 1;
      }
      if (event.key === ex.Input.Keys.A) {
        input.x -= 1;
      }

      this.playerCharacter.addInput(input);
    });

    this.game.start();
  }

  public updateSettings(settings: ISettings): void {
    this.updateEnemySetting(settings.enemy);
  }

  public updateGunTreeCode(code: string): void {
    const gt = evalGunTree(code);
    this.enemy.setGuntree(gt);
  }

  private createTouchInput(game: ex.Engine): TouchInput {
    const touchEvent = (pos: ex.Vector): void => {
      this.enemy.startFiring();
    };
    const moveEvent = (delta: ex.Vector): void => {
      this.playerCharacter.rawMove(delta);
    };
    return new TouchInput(touchEvent, moveEvent);
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
